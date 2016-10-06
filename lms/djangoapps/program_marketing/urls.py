"""
Django URLs for service status app
"""

from django.conf.urls import patterns, url


urlpatterns = patterns(
    '',
    url(
        r'^(?P<program_id>\d+)/[\w\-]*/?$',
        'program_marketing.views.marketing',
        name='program_marketing'
    ),
)
