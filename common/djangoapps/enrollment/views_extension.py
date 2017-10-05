from django.core.validators import ValidationError
from django.utils.decorators import method_decorator
from djangooidc.models import Keycloak
from djangooidc.backends import get_user_by_id
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.cors_csrf.decorators import ensure_csrf_cookie_cross_domain
from rest_framework import status
from rest_framework.response import Response

from student.models import CourseEnrollment
from .views import EnrollmentListView


class EnrollmentExtensionListView(EnrollmentListView):

    @method_decorator(ensure_csrf_cookie_cross_domain)
    def get(self, request):
        keycloak_uid = request.GET.get('keycloak_uid')

        if keycloak_uid:
            keycloak = Keycloak.objects.filter(uid=keycloak_uid).first()

            if keycloak:
                copy_get = request.GET.copy()
                copy_get['user'] = keycloak.user.username
                request.GET = copy_get

        return super(EnrollmentExtensionListView, self).get(request)

    def post(self, request):
        keycloak_uid = request.data.get('keycloak_uid')
        username = request.data.get('user', request.user.username)

        if not keycloak_uid:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Keycloak UID required field."}
            )

        if not username:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Username required field."}
            )
        try:
            user = get_user_by_id({'sub': keycloak_uid, 'preferred_username': username, 'email': username})
        except ValidationError as er:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data=er
            )

        request._full_data.update({'user': user.username})

        return super(EnrollmentExtensionListView, self).post(request)

    def delete(self, request):
        keycloak_uid = request.data.get('keycloak_uid')
        course_id = request.data.get('course_id')

        if not keycloak_uid:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Keycloak UID required field"}
            )

        if not course_id:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Course ID must be specified to create a new enrollment."}
            )

        try:
            course_id = CourseKey.from_string(course_id)
        except InvalidKeyError:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": u"No course '{course_id}' found for enrollment".format(course_id=course_id)
                }
            )

        keycloak = Keycloak.objects.filter(uid=keycloak_uid).first()
        if keycloak is None:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": u"Not enrolled in this course {}".format(course_id)
                }
            )

        enrollment = CourseEnrollment.get_enrollment(keycloak.user, course_id)
        if not enrollment:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": u"Not enrolled in this course {}".format(course_id)
                }
            )

        CourseEnrollment.unenroll(keycloak.user, course_id)

        return Response({'unenroll': True})
