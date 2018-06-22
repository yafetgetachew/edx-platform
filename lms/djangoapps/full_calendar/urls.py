from django.conf.urls import url


urlpatterns = [
    url(r'^$', 'full_calendar.views.main', name='custom-calendar'),
]
