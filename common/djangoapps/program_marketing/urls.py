"""
Django URLs for service status app
"""

from django.conf.urls import patterns, url


urlpatterns = patterns(
    '',
    url(
        r'(?P<slug>[\w\-]*)/?$',
        'program_marketing.views.program_marketing',
        name='program_marketing'
    ),
)
