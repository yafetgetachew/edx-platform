"""
Asynchronous tasks for the CCX app.
"""
import logging
import requests

from django.conf import settings
from django.contrib.auth.models import User
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from django.core.cache import cache

from lms import CELERY_APP

log = logging.getLogger(__name__)


def add_verify_status(statistic_map):
    from lms.djangoapps.verify_student.models import SoftwareSecurePhotoVerification
    for statistic_id, data in statistic_map.iteritems():
        username, course_id = statistic_id.split('::', 1)
        cache_key = 'ospp_verify_user_stat_' + username
        status = cache.get(cache_key)
        if not status:
            status = SoftwareSecurePhotoVerification.objects.filter(
                    user__username=username,
                    status=SoftwareSecurePhotoVerification.STATUS.approved
            ).values_list('updated_at', flat=True)
        if status:
            data['idVerify'] = 'Y'
            data['idVerifyDate'] = status[0].strftime("%Y-%m-%d %H:%M:%S")
            cache.set(cache_key, status)


def add_grades(statistic_map):
    from courseware.courses import get_course_with_access
    from lms.djangoapps.grades.new.course_grade_factory import CourseGradeFactory

    for statistic_id, data in statistic_map.iteritems():
        if 'finalGrade' not in data:
            continue

        username, course_id = statistic_id.split('::', 1)
        try:
            course_key = CourseKey.from_string(course_id)
        except InvalidKeyError:
            data.pop('finalGrade', None)
            continue
        user = User.objects.get(username=username)
        course = get_course_with_access(user, 'load', course_key)

        course_grade = CourseGradeFactory().create(user, course)
        grade_summary = course_grade.summary
        final_grade = grade_summary['grade']
        if final_grade:
            data['finalGrade'] = final_grade
        else:
            data.pop('finalGrade', None)
        data['grade'] = grade_summary['percent']


@CELERY_APP.task
def send_statistic(statistic_map):
    log.info("receive statistic map :: " + str(statistic_map))
    add_verify_status(statistic_map)
    add_grades(statistic_map)
    statistic_list = []
    for statistic_id, data in statistic_map.iteritems():
        username, course_id = statistic_id.split('::', 1)
        data.update({
            'username': username,
            "courseInfo": {
                "openEdxCourseId": course_id,
            }
        })
        statistic_list.append(data)
    url = getattr(settings, 'ASU_API_URL', '') + "/api/enrollments"
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    log.info("sending statistic to server :: " + str(statistic_list))
    result = requests.patch(url, json=statistic_list, headers=headers)
    log.info("Server response with code: " + str(result.status_code) + " and body: " + str(result.json()))
