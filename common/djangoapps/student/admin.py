""" Django admin pages for student app """
from django import forms
from django.conf import settings
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import ugettext_lazy as _
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from ratelimitbackend import admin
from xmodule.modulestore.django import modulestore

from config_models.admin import ConfigurationModelAdmin
from student.models import (
    UserProfile, UserTestGroup, CourseEnrollmentAllowed, DashboardConfiguration, CourseEnrollment, Registration,
    PendingNameChange, CourseAccessRole, LinkedInAddToProfileConfiguration, UserAttribute, LogoutViewConfiguration,
    RegistrationCookieConfiguration, StudentReport
)
from student.roles import REGISTERED_ACCESS_ROLES
from openedx.core.djangoapps.site_configuration import helpers as configuration_helpers
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from openedx.core.djangoapps.xmodule_django.models import CourseKeyField
from course_modes.models import CourseMode
from django_countries import countries as django_countries
import unicodecsv

User = get_user_model()  # pylint:disable=invalid-name


class CourseAccessRoleForm(forms.ModelForm):
    """Form for adding new Course Access Roles view the Django Admin Panel."""

    class Meta(object):
        model = CourseAccessRole
        fields = '__all__'

    email = forms.EmailField(required=True)
    COURSE_ACCESS_ROLES = [(role_name, role_name) for role_name in REGISTERED_ACCESS_ROLES.keys()]
    role = forms.ChoiceField(choices=COURSE_ACCESS_ROLES)

    def clean_course_id(self):
        """
        Checking course-id format and course exists in module store.
        This field can be null.
        """
        if self.cleaned_data['course_id']:
            course_id = self.cleaned_data['course_id']

            try:
                course_key = CourseKey.from_string(course_id)
            except InvalidKeyError:
                raise forms.ValidationError(u"Invalid CourseID. Please check the format and re-try.")

            if not modulestore().has_course(course_key):
                raise forms.ValidationError(u"Cannot find course with id {} in the modulestore".format(course_id))

            return course_key

        return None

    def clean_org(self):
        """If org and course-id exists then Check organization name
        against the given course.
        """
        if self.cleaned_data.get('course_id') and self.cleaned_data['org']:
            org = self.cleaned_data['org']
            org_name = self.cleaned_data.get('course_id').org
            if org.lower() != org_name.lower():
                raise forms.ValidationError(
                    u"Org name {} is not valid. Valid name is {}.".format(
                        org, org_name
                    )
                )

        return self.cleaned_data['org']

    def clean_email(self):
        """
        Checking user object against given email id.
        """
        email = self.cleaned_data['email']
        try:
            user = User.objects.get(email=email)
        except Exception:
            raise forms.ValidationError(
                u"Email does not exist. Could not find {email}. Please re-enter email address".format(
                    email=email
                )
            )

        return user

    def clean(self):
        """
        Checking the course already exists in db.
        """
        cleaned_data = super(CourseAccessRoleForm, self).clean()
        if not self.errors:
            if CourseAccessRole.objects.filter(
                    user=cleaned_data.get("email"),
                    org=cleaned_data.get("org"),
                    course_id=cleaned_data.get("course_id"),
                    role=cleaned_data.get("role")
            ).exists():
                raise forms.ValidationError("Duplicate Record.")

        return cleaned_data

    def __init__(self, *args, **kwargs):
        super(CourseAccessRoleForm, self).__init__(*args, **kwargs)
        if self.instance.user_id:
            self.fields['email'].initial = self.instance.user.email


@admin.register(CourseAccessRole)
class CourseAccessRoleAdmin(admin.ModelAdmin):
    """Admin panel for the Course Access Role. """
    form = CourseAccessRoleForm
    raw_id_fields = ("user",)
    exclude = ("user",)

    fieldsets = (
        (None, {
            'fields': ('email', 'course_id', 'org', 'role',)
        }),
    )

    list_display = (
        'id', 'user', 'org', 'course_id', 'role',
    )
    search_fields = (
        'id', 'user__username', 'user__email', 'org', 'course_id', 'role',
    )

    def save_model(self, request, obj, form, change):
        obj.user = form.cleaned_data['email']
        super(CourseAccessRoleAdmin, self).save_model(request, obj, form, change)


@admin.register(LinkedInAddToProfileConfiguration)
class LinkedInAddToProfileConfigurationAdmin(admin.ModelAdmin):
    """Admin interface for the LinkedIn Add to Profile configuration. """

    class Meta(object):
        model = LinkedInAddToProfileConfiguration

    # Exclude deprecated fields
    exclude = ('dashboard_tracking_code',)


@admin.register(CourseEnrollment)
class CourseEnrollmentAdmin(admin.ModelAdmin):
    """ Admin interface for the CourseEnrollment model. """
    list_display = ('id', 'course_id', 'mode', 'user', 'is_active',)
    list_filter = ('mode', 'is_active',)
    raw_id_fields = ('user',)
    search_fields = ('course_id', 'mode', 'user__username',)

    def queryset(self, request):
        return super(CourseEnrollmentAdmin, self).queryset(request).select_related('user')

    class Meta(object):
        model = CourseEnrollment


class UserProfileInline(admin.StackedInline):
    """ Inline admin interface for UserProfile model. """
    model = UserProfile
    can_delete = False
    verbose_name_plural = _('User profile')


def _is_shopping_cart_enabled():
    """
    Utility method to check the various configuration to verify that
    all of the settings have been enabled
    """
    enable_paid_course_registration = configuration_helpers.get_value(
        'ENABLE_PAID_COURSE_REGISTRATION',
        settings.FEATURES.get('ENABLE_PAID_COURSE_REGISTRATION')
    )

    enable_shopping_cart = configuration_helpers.get_value(
        'ENABLE_SHOPPING_CART',
        settings.FEATURES.get('ENABLE_SHOPPING_CART')
    )


def write_users_report(queryset, fd, overwrite=False):
    header = (
        _('First name'),
        _('Last name'),
        _('Email'),
        _('Job title'),
        _('Organization Name'),
        _('Country'),
        _('Region'),
        _('MOOC Name'),
        _('MOOC Number'),
        _('MOOC Code'),
        _('MOOC Status'),
        _('Course Start Date'),
        _('Course End Date'),
        _('Certified'),
        _('Certificate of completion date'),
        _('Price'),
        _('Currency'),
    )

    writer = unicodecsv.writer(fd, encoding='utf-8')
    writer.writerow(header)

    countries = dict(django_countries)
    courses = {}

    users = dict((u.id, u) for u in User.objects.all())

    for course in CourseOverview.objects.all():
        course_status = course.has_ended() and _('Complete') or course.has_started() and _('In Progress') or _('Not Started')
        course_content = modulestore().get_course(course.id)
        courses[course.id.to_deprecated_string()] = {
            'row': [
                course.display_name_with_default,
                course.display_number_with_default,
                course.id.to_deprecated_string(),
                course_status,
                course.start and course.start.strftime('%d/%m/%Y') or _('N/A'),
                course.end and course.end.strftime('%d/%m/%Y') or _('N/A'),
                _('N'),
                _('N/A'),
                '0',
                settings.PAID_COURSE_REGISTRATION_CURRENCY[1]
            ],
            'course': course_content,
            'course_key': course.id,
        }

    user_attrs = (
        'id',
        'email',
        'first_name',
        'last_name',
        'profile__name',
        'profile__country',
        'profile__job',
        'profile__organization',
        'profile__region',
        'courseenrollment__course_id',
    )

    for user in queryset.values(*user_attrs):
        course = courses.get(user['courseenrollment__course_id'])

        try:
            row_from_cache = StudentReport.objects.get(
                user_id=user['id'],
                course_id=course and course['course_key'] or CourseKeyField.Empty
            )
        except StudentReport.DoesNotExist:
            row_from_cache = None

        if not row_from_cache or overwrite:
            name_list = user['profile__name'] and user['profile__name'].split() or [user['first_name'], user['last_name']]
            fname = name_list[0]
            lname = ' '.join(name_list[1:])
            country = countries.get(user['profile__country'], user['profile__country'] or _('N/A'))
            job = user['profile__job'] or _('N/A')
            org = user['profile__organization'] or _('N/A')
            region = user['profile__region'] or _('N/A')

            user_row = [fname, lname, user['email'], job, org, country, region,]

            if course:
                try:
                    from lms.djangoapps.courseware.views.views import is_course_passed
                    is_passed = is_course_passed(course['course'], None, users[user['id']]) and _('Y') or _('N')
                except Exception:
                    is_passed = _('N')

                price = CourseMode.min_course_price_for_currency(
                    course.get('course_key'),
                    settings.PAID_COURSE_REGISTRATION_CURRENCY[0]
                )

                can_add_course_to_cart = _is_shopping_cart_enabled() and price
                course_row = list(course.get('row', [_('N/A')] * 10))
                course_row[6] = is_passed
                course_row[8] = price
            else:
                course_row = [_('N/A')] * 10

            row = user_row + course_row
            StudentReport.create_or_update_from_list(users[user['id']], course and course['course_key'] or CourseKeyField.Empty, row)
        else:
            row = row_from_cache.to_list()
        writer.writerow(row)


def export_users_as_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=users_report.csv'
    write_users_report(queryset, response)
    return response

export_users_as_csv.short_description = _('Export users as CSV')


class UserAdmin(BaseUserAdmin):
    """ Admin interface for the User model. """
    inlines = (UserProfileInline,)
    actions = (export_users_as_csv,)


@admin.register(UserAttribute)
class UserAttributeAdmin(admin.ModelAdmin):
    """ Admin interface for the UserAttribute model. """
    list_display = ('user', 'name', 'value',)
    list_filter = ('name',)
    raw_id_fields = ('user',)
    search_fields = ('name', 'value', 'user__username',)

    class Meta(object):
        model = UserAttribute


admin.site.register(UserTestGroup)
admin.site.register(CourseEnrollmentAllowed)
admin.site.register(Registration)
admin.site.register(PendingNameChange)
admin.site.register(DashboardConfiguration, ConfigurationModelAdmin)
admin.site.register(LogoutViewConfiguration, ConfigurationModelAdmin)
admin.site.register(RegistrationCookieConfiguration, ConfigurationModelAdmin)


# We must first un-register the User model since it may also be registered by the auth app.
admin.site.register(User, UserAdmin)
