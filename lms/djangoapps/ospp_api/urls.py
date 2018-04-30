from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from django.conf import settings

from ospp_api.views import CreateUserView, EnrollUserView, RoutView, SendCreditRequest, UpdateEnrollForCourseView

urlpatterns = (
    url(r'^create_user$', CreateUserView.as_view(), name='create_user'),
    url(r'^course_enrollments$', EnrollUserView.as_view(), name='course_enrollments'),
    url(r'^rout_to/(?P<lms_page_name>\w+)/$', login_required(RoutView.as_view()), name='rout_to'),
    url(r'^send_credit_request/$', login_required(SendCreditRequest.as_view()), name='send_credit_request'),
    url(
        r'^enrollments_status_update/{course}/$'.format(course=settings.COURSE_ID_PATTERN),
        UpdateEnrollForCourseView.as_view(),
        name="enrollments_status_update",
    ),
)
