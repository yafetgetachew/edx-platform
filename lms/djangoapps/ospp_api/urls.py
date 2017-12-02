from django.conf.urls import url

from ospp_api.views import CreateUserView


urlpatterns = (
    url(r'^create_user$', CreateUserView.as_view(), name='create_user'),
)
