import requests
import logging

from django.conf import settings
from opaque_keys.edx.keys import CourseKey
from openedx.core.djangoapps.credit.models import CreditEligibility

from student.models import CourseEnrollment

log = logging.getLogger(__name__)

VERIFY_ELIGIBLE = (1, 2)
CREDIT_ELIGIBLE = (1, 3)


def get_learner_info(user_id):
    url = getattr(settings, 'ASU_API_URL', '') + "/api/learner?openEdxId={}".format(user_id)
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    student_status = requests.get(url, headers=headers).json()
    return isinstance(student_status, dict) and student_status or {}


def get_credit_convert_eligibility(user, enrollment):
    return CreditEligibility.objects.get(course_id=enrollment.course_id, username=user.username)


def change_user_enrollment(enrollment, type):
    if enrollment.mode == type:
        return
    enrollment.mode = type
    enrollment.save()


def applay_user_status_to_enroll(user, course_enrollment, status):
    benefit_type = status.get('benefitType')
    if not status and status.get('eligibilityStatus') != 'true' and not benefit_type:
        return

    if benefit_type in CREDIT_ELIGIBLE and get_credit_convert_eligibility(user, course_enrollment):
        change_user_enrollment(course_enrollment, 'credit')
    elif benefit_type in VERIFY_ELIGIBLE:
        change_user_enrollment(course_enrollment, 'verified')


def update_user_state_from_eligible(user, course_key):
    if isinstance(course_key, basestring):
        course_key = CourseKey.from_string(course_key)
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
