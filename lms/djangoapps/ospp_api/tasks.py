"""
Asynchronous tasks for the CCX app.
"""

import logging
import requests
from django.conf import settings

from lms import CELERY_APP

from django.core.cache import cache

log = logging.getLogger(__name__)


def add_verify_status(statistic_map):
    from lms.djangoapps.verify_student.models import SoftwareSecurePhotoVerification
    for (username, course_id), data in statistic_map.iteritems():
        cache_key = 'ospp_verify_user_stat_' + username
        status = cache.get(cache_key)
        if not status:
            status = SoftwareSecurePhotoVerification.objects.filter(
                    user__username=username,
                    status=SoftwareSecurePhotoVerification.STATUS.approved
            ).values_list('status_changed', flat=True)
        if len(status) > 0:
            data['idVerify'] = 'Y'
            data['idVerifyDate'] = status[0].strftime("%Y-%m-%d %H:%M:%S")
            cache.set(cache_key, status)


@CELERY_APP.task
def send_statistic(statistic_map):
    add_verify_status(statistic_map)
    log.info("receive statistic map" + str(statistic_map))
    statistic_list = [
        data.update({
            'asuRite': username,
            "courseInfo": {
                "openEdxCourseId": course_id,
            }

        }) or data
        for (username, course_id), data in statistic_map.iteritems()
    ]
    url = getattr(settings, 'ASU_API_URL', '') + "/api/enrollments"
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    result = requests.patch(url, json=statistic_list, headers=headers)
    log.info("Server response with code: " + str(result.status_code) + " and body: " + str(result.json()))
