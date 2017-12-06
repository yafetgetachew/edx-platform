from django.conf.urls import url

from ospp_api.views import CreateUserView, EnrollUserView

urlpatterns = (
    url(r'^create_user$', CreateUserView.as_view(), name='create_user'),
    url(r'^course_enrollments$', EnrollUserView.as_view(), name='course_enrollments'),
)
