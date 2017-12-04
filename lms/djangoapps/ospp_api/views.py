import logging
import string
import random

from django.core.exceptions import ValidationError, ObjectDoesNotExist
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.user_api.preferences.api import update_email_opt_in
from openedx.core.lib.exceptions import CourseNotFoundError
from openedx.core.lib.log_utils import audit_log
from openedx.features.enterprise_support.api import enterprise_enabled, EnterpriseApiClient, EnterpriseApiException
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_406_NOT_ACCEPTABLE
from rest_framework.views import APIView
from rest_framework.response import Response
from social_django.models import UserSocialAuth

from enrollment import api
from enrollment.errors import CourseEnrollmentError, CourseModeNotFoundError, CourseEnrollmentExistsError
from enrollment.views import REQUIRED_ATTRIBUTES
from third_party_auth.models import SAMLProviderConfig, SAMLProviderData
from openedx.core.djangoapps.user_api.accounts.api import check_account_exists
from openedx.core.lib.api.authentication import OAuth2AuthenticationAllowInactiveUser
from openedx.core.lib.api.permissions import ApiKeyHeaderPermission
from student.views import create_account_with_params
from student.models import User


log = logging.getLogger(__name__)


class CreateUserView(APIView):
    authentication_classes = OAuth2AuthenticationAllowInactiveUser,
    permission_classes = ApiKeyHeaderPermission,

    def post(self, request):
        """
        Creates a new user account

        URL: /ospp_api/v0/create_user/
        Arguments:
            request (HttpRequest)
                HEAD
                {
                    "x-edx-api-key": "EDX-API-TOKEN"
                }
                JSON (application/json)
                {
                    "username": "user4",
                    "email": "userUdot@example.com",
                }
        Returns:
            HttpResponse: 200 on success, {"user_id": 3}
            HttpResponse: 400 if the request is not valid
            HttpResponse: 409 if an account with the given username or email address already exists
        """
        data = request.data

        data['honor_code'] = "True"
        data['terms_of_service'] = "True"

        # Handle duplicate email/username
        conflicts = check_account_exists(email=data['email'], username=data['username'])
        if conflicts:
            errors = {"user_message": "User already exists"}
            return Response(errors, status=409)
        # Generate fake password and set name equal to the username
        data['password'] = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
        name = data['name'].split(' ', 1)

        # Avoid sending activation email
        data['send_activation_email'] = False
        try:
            user = create_account_with_params(request, data)
            user.is_active = True
            idp = SAMLProviderConfig.objects.first().backend_name
            social_user_id = '{}:{}'.format(idp, data.pop('name_id'))
            UserSocialAuth.objects.create(user=user, provider=idp, uid=social_user_id)
            user.first_name = name[0]
            user.last_name = name[1]
            user.save()
        except ValidationError:
            errors = {"user_message": "Wrong parameters on user creation"}
            return Response(errors, status=400)
        except AttributeError:
            errors = {"user_message": "Wrong Identity Provider's configuration"}
            return Response(errors, status=400)

        return Response({'user_id': user.id}, status=200)


class EnrollUserView(APIView):
    authentication_classes = OAuth2AuthenticationAllowInactiveUser,
    permission_classes = ApiKeyHeaderPermission,

    def post(self, request):
        """
        Create/Update enrollment

        URL: /ospp_api/v0/enrollments
        Arguments:
            request (HttpRequest)
                HEAD
                {
                    "x-edx-api-key": "EDX-API-TOKEN"
                }
                JSON (application/json)
                {
                  "user_id": "16",
                  "is_active": "default:true, [true|false]",
                  "mode":"default:audit, [honor|professional|verified|audit]",
                  "course_details": {
                    "course_id": "course-v1:Rom+RM1+2015"
                  }
                }

        Returns:
            HttpResponse: 200 on success,
                {
                  "created": "2017-12-01T15:32:14.767504Z",
                  "mode": "honor",
                  "is_active": true,
                  "course_details": {
                    "course_id": "course-v1:Rom+RM1+2015",
                    "course_name": "Tor",
                    "enrollment_start": null,
                    "enrollment_end": null,
                    "course_start": "2015-01-01T00:00:00Z",
                    "course_end": null,
                    "invite_only": false,
                    "course_modes": [
                      {
                        "slug": "honor",
                        "name": "Honor Certificate",
                        "min_price": 0,
                        "suggested_prices": "",
                        "currency": "usd",
                        "expiration_datetime": null,
                        "description": null,
                        "sku": "8812E4C",
                        "bulk_sku": null
                      },
                      {
                        "slug": "verified",
                        "name": "Verified Certificate",
                        "min_price": 100,
                        "suggested_prices": "",
                        "currency": "usd",
                        "expiration_datetime": "2018-01-10T00:00:00Z",
                        "description": null,
                        "sku": "4CDEA2A",
                        "bulk_sku": null
                      }
                    ]
                  },
                  "user": "Honor12"
                }
            HttpResponse: 400 if the request is not valid
            HttpResponse: 406 if an account with the given user id not found

        """
        course_id = request.data.get('course_details', {}).get('course_id')
        if not course_id:
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={"message": u"Course ID must be specified to create a new enrollment."}
            )

        try:
            course_id = CourseKey.from_string(course_id)
        except InvalidKeyError:
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={
                        "message": u"No course '{course_id}' found for enrollment".format(course_id=course_id)
                    }
            )

        user_id = request.data.get('user_id')

        if not user_id:
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={"message": u"User ID must be specified to create a new enrollment."}
            )

        try:
            user = User.objects.get(id=user_id)
        except ObjectDoesNotExist:
            return Response(
                status=HTTP_406_NOT_ACCEPTABLE,
                data={
                    'message': u'The user with id {} does not exist.'.format(user_id)
                }
            )
        username = user.username

        mode = request.data.get('mode')

        try:
            is_active = request.data.get('is_active')
            # Check if the requested activation status is None or a Boolean
            if is_active is not None and not isinstance(is_active, bool):
                return Response(
                        status=HTTP_400_BAD_REQUEST,
                        data={
                            'message': (u"'{value}' is an invalid enrollment activation status.").format(
                                value=is_active)
                        }
                )

            enterprise_course_consent = request.data.get('enterprise_course_consent')
            # Check if the enterprise_course_enrollment is a boolean
            if enterprise_enabled() and enterprise_course_consent is not None:
                if not isinstance(enterprise_course_consent, bool):
                    return Response(
                            status=HTTP_400_BAD_REQUEST,
                            data={
                                'message': (u"'{value}' is an invalid enterprise course consent value.").format(
                                        value=enterprise_course_consent
                                )
                            }
                    )
                try:
                    EnterpriseApiClient().post_enterprise_course_enrollment(
                            username,
                            unicode(course_id),
                            enterprise_course_consent
                    )
                except EnterpriseApiException as error:
                    log.exception("An unexpected error occurred while creating the new EnterpriseCourseEnrollment "
                                  "for user [%s] in course run [%s]", username, course_id)
                    raise CourseEnrollmentError(error.message)

            enrollment_attributes = request.data.get('enrollment_attributes')
            enrollment = api.get_enrollment(username, unicode(course_id))
            mode_changed = enrollment and mode is not None and enrollment['mode'] != mode
            active_changed = enrollment and is_active is not None and enrollment['is_active'] != is_active
            missing_attrs = []
            if enrollment_attributes:
                actual_attrs = [
                    u"{namespace}:{name}".format(**attr)
                    for attr in enrollment_attributes
                ]
                missing_attrs = set(REQUIRED_ATTRIBUTES.get(mode, [])) - set(actual_attrs)
            if mode_changed or active_changed:
                if mode_changed and active_changed and not is_active:
                    # if the requester wanted to deactivate but specified the wrong mode, fail
                    # the request (on the assumption that the requester had outdated information
                    # about the currently active enrollment).
                    msg = u"Enrollment mode mismatch: active mode={}, requested mode={}. Won't deactivate.".format(
                            enrollment["mode"], mode
                    )
                    log.warning(msg)
                    return Response(status=HTTP_400_BAD_REQUEST, data={"message": msg})

                if len(missing_attrs) > 0:
                    msg = u"Missing enrollment attributes: requested mode={} required attributes={}".format(
                            mode, REQUIRED_ATTRIBUTES.get(mode)
                    )
                    log.warning(msg)
                    return Response(status=HTTP_400_BAD_REQUEST, data={"message": msg})

                response = api.update_enrollment(
                        username,
                        unicode(course_id),
                        mode=mode,
                        is_active=is_active,
                        enrollment_attributes=enrollment_attributes
                )
            else:
                # Will reactivate inactive enrollments.
                response = api.add_enrollment(
                        username,
                        unicode(course_id),
                        mode=mode,
                        is_active=is_active,
                        enrollment_attributes=enrollment_attributes
                )

            email_opt_in = request.data.get('email_opt_in', None)
            if email_opt_in is not None:
                org = course_id.org
                update_email_opt_in(request.user, org, email_opt_in)

            log.info('The user [%s] has already been enrolled in course run [%s].', username, course_id)
            return Response(response)
        except CourseModeNotFoundError as error:
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={
                        "message": (
                            u"The [{mode}] course mode is expired "
                            u"or otherwise unavailable for course run [{course_id}]."
                        ).format(mode=mode, course_id=course_id),
                        "course_details": error.data
                    })
        except CourseNotFoundError:
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={
                        "message": u"No course '{course_id}' found for enrollment".format(course_id=course_id)
                    }
            )
        except CourseEnrollmentExistsError as error:
            log.warning('An enrollment already exists for user [%s] in course run [%s].', username, course_id)
            return Response(data=error.enrollment)
        except CourseEnrollmentError:
            log.exception("An error occurred while creating the new course enrollment for user "
                          "[%s] in course run [%s]", username, course_id)
            return Response(
                    status=HTTP_400_BAD_REQUEST,
                    data={
                        "message": (
                            u"An error occurred while creating the new course enrollment for user "
                            u"'{username}' in course '{course_id}'"
                        ).format(username=username, course_id=course_id)
                    }
            )
        finally:
            current_enrollment = api.get_enrollment(username, unicode(course_id))
            audit_log(
                    'enrollment_change_requested',
                    course_id=unicode(course_id),
                    requested_mode=mode,
                    actual_mode=current_enrollment['mode'] if current_enrollment else None,
                    requested_activation=is_active,
                    actual_activation=current_enrollment['is_active'] if current_enrollment else None,
                    user_id=user.id
            )
