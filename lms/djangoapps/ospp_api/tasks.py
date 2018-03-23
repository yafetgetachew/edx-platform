"""
Asynchronous tasks for the CCX app.
"""
import logging
from datetime import timedelta

import requests
from celery.task import task, periodic_task
from django.conf import settings
from django.contrib.auth.models import User
from django.core.cache import cache
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey

from ospp_api.backends.tracking import OSPP_TRACKER_CACHE_KEY_ALL_TASK

log = logging.getLogger(__name__)


def add_verify_status(statistic_map, username):
    from lms.djangoapps.verify_student.models import SoftwareSecurePhotoVerification
    status = SoftwareSecurePhotoVerification.objects.filter(
        user__username=username,
    ).values('updated_at', 'status').first()
    if status:
        statistic_map['idVerify'] = status['status']
        statistic_map['idVerifyDate'] = status['updated_at'].strftime("%Y-%m-%d %H:%M:%S")


def add_grades(statistic_map, username, course_id):
    from courseware.courses import get_course_with_access
    from lms.djangoapps.grades.new.course_grade_factory import CourseGradeFactory

    if 'finalGrade' not in statistic_map:
        return

    try:
        course_key = CourseKey.from_string(course_id)
    except InvalidKeyError:
        statistic_map.pop('finalGrade', None)
        return
    user = User.objects.get(username=username)
    course = get_course_with_access(user, 'load', course_key)

    course_grade = CourseGradeFactory().create(user, course)
    grade_summary = course_grade.summary
    final_grade = grade_summary.get('grade')
    if final_grade:
        statistic_map['finalGrade'] = final_grade
    else:
        # finalGrade passed to data map with an empty value for feature calculation.
        # In case, when we can not calculate the value we don't send an empty value to the server.
        statistic_map.pop('finalGrade', None)
    statistic_map['grade'] = grade_summary['percent']


def send_statistic_list(items_ids):
    url = getattr(settings, 'ASU_API_URL', '') + "/api/enrollments"
    statistic_list = []
    for record_id in items_ids:
        data = cache.get(record_id)
        if not data:
            log.warn("Can not find record wit key `%s` inside cache", record_id)
            continue
        body = data['body']
        username = data['username']
        course_id = data['course_id']
        add_verify_status(body, username)
        add_grades(body, username, course_id)
        body.update({
            'username': username,
            "courseInfo": {
                "openEdxCourseId": course_id,
            }
        })
        statistic_list.append(body)
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    log.info("sending statistic to server :: " + str(statistic_list))
    result = requests.patch(url, json=statistic_list, headers=headers)
    log.info("Server response with code: " + str(result.status_code) + " and body: " + str(result.json()))


@periodic_task(run_every=timedelta(seconds=getattr(settings, 'ASU_TRACKER_BUFFER_LIFE_TIME', 60)))
def send_statistic():
    batch_size = getattr(settings, 'ASU_TRACKER_BUFFER_SIZE', 60)
    all_records = cache.get(OSPP_TRACKER_CACHE_KEY_ALL_TASK)
    if not all_records:
        return
    all_records = list(all_records)
    cache.delete(OSPP_TRACKER_CACHE_KEY_ALL_TASK)
    for i in xrange(0, len(all_records), batch_size):
        send_statistic_list(all_records[i:i + batch_size])
