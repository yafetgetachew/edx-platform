from rest_framework import viewsets
from rest_framework import serializers

from certificates.models import GeneratedCertificate

from lms.djangoapps.courseware.courses import get_course_by_id
from lms.djangoapps.grades.new.course_grade import CourseGradeFactory
from openedx.core.djangoapps.user_api.accounts.image_helpers import get_profile_image_urls_for_user
from xmodule.modulestore.django import modulestore


class CertificateSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = GeneratedCertificate
        fields = ('username', 'user_fullname', 'course_id', 'course_title',
                  'download_url', 'certificate_url', 'uuid', 'profile_image',
                  'status', 'mode', 'name', 'created_date',
                  'modified_date', 'error_reason','grade',
                  'grade_summary',)

    username = serializers.SerializerMethodField()
    user_fullname = serializers.SerializerMethodField()
    certificate_url = serializers.CharField(source='get_certificate_url')
    uuid = serializers.CharField(source='verify_uuid')
    profile_image = serializers.SerializerMethodField()
    grade_summary = serializers.SerializerMethodField()
    course_title = serializers.SerializerMethodField()

    def get_profile_image(self, cert):
        return get_profile_image_urls_for_user(cert.user)

    def get_username(self, cert):
        return cert.user.username

    def get_user_fullname(self, cert):
        return cert.user.profile.name or cert.user.get_fullname()

    def get_grade_summary(self, cert):
        with modulestore().bulk_operations(cert.course_id):
            course = get_course_by_id(cert.course_id, depth=2)
            course_grade = CourseGradeFactory().create(cert.user, course)
            return course_grade.summary

    def get_course_title(self, cert):
        course = get_course_by_id(cert.course_id, depth=2)
        return course.display_name

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'verify_uuid'
    serializer_class = CertificateSerializer
    queryset = GeneratedCertificate.objects.all()
