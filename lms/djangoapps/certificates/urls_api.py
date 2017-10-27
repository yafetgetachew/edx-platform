from django.conf.urls import patterns, url

from .views.api import CertificateViewSet


urlpatterns = patterns(
    '',
    url(r'^v1/certificates/$', CertificateViewSet.as_view({'get': 'list'}), name='certificate-list'),
    url(r'^v1/certificates/(?P<verify_uuid>[0-9,a-f]{32})',
        CertificateViewSet.as_view({'get': 'retrieve'}),
        name='certificate-detail'
    ),
)