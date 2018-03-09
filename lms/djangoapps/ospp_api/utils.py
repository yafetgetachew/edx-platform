import logging

import requests
from django.conf import settings
from django.http import Http404
from djangomako.shortcuts import render_to_string
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.credit.models import CreditEligibility
from social_django.models import UserSocialAuth

from student.models import CourseEnrollment

log = logging.getLogger(__name__)

VERIFY_ELIGIBLE = (1, 2)
CREDIT_ELIGIBLE = (1, 3)


class HttpLearnerApiException(Exception):
    pass


def get_learner_info(user_id):
    url = getattr(settings, 'ASU_API_URL', '') + "/api/learner?openEdxId={}".format(user_id)
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    result = requests.get(url, headers=headers)
    if result.status_code == 200:
        student_status = result.json()
        if student_status and isinstance(student_status, dict):
            return student_status
    if not UserSocialAuth.objects.filter(user_id=user_id).exists() and settings.BETTA_TESTERS_ENABLE:
        return {
            'eligibilityStatus': "true",
            'benefitType': 1,
        }
    raise HttpLearnerApiException


def get_credit_convert_eligibility(user, enrollment):
    return CreditEligibility.objects.filter(
        course__course_key=enrollment.course_id,
        username=user.username
    ).exists()


def change_user_enrollment(enrollment, type):
    if enrollment.mode == type:
        return
    enrollment.mode = type
    enrollment.save()


def applay_user_status_to_enroll(user, course_enrollment, status):
    benefit_type = int(status.get('benefitType', 0))
    if not status or status.get('eligibilityStatus') != 'true' or not benefit_type:
        return

    if benefit_type in CREDIT_ELIGIBLE and get_credit_convert_eligibility(user, course_enrollment):
        change_user_enrollment(course_enrollment, 'credit')
    elif benefit_type in VERIFY_ELIGIBLE:
        change_user_enrollment(course_enrollment, 'verified')


def update_user_state_from_eligible(user, course_key):
    if isinstance(course_key, basestring):
        course_key = CourseKey.from_string(course_key)
    if not isinstance(course_key, CourseKey):
        raise Exception("Unknown format of the Course Key : `{}`".format(course_key))

    try:
        course_enrollment = CourseEnrollment.objects.get(course_id=course_key, user=user)
    except (CourseEnrollment.DoesNotExist) as err:
        log.warning(
            "Cannot provide student ckecking for eligibility and partner benefits, the Error is: {}".format(err)
        )
        return

    if course_enrollment.mode == 'credit':
        return

    status = get_learner_info(user.id)
    applay_user_status_to_enroll(user, course_enrollment, status)
