from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from rest_framework import status
from rest_framework.response import Response

from .views import EnrollmentListView
from student.models import CourseEnrollment


class EnrollmentExtensionListView(EnrollmentListView):

    def post(self, request):
        email = request.data.get('email')

        if not email:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Email required field."}
            )

        try:
            user = User.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Could not find user by email address '{email}'.".format(email=email)}
            )

        request._full_data.update({'user': user.username})

        return super(EnrollmentExtensionListView, self).post(request)

    def delete(self, request):
        course_id = request.data.get('course_details', {}).get('course_id')
        email = request.data.get('email')

        if not email:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={"message": u"Email required field."}
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

        user = User.objects.filter(email=email).first()
        if user is None:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": u"Not enrolled in this course {}".format(course_id)
                }
            )

        enrollment = CourseEnrollment.get_enrollment(user, course_id)

        if not enrollment:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={
                    "message": u"Not enrolled in this course {}".format(course_id)
                }
            )

        CourseEnrollment.unenroll(user, course_id)

        return Response({'unenroll': True})
