import logging
import requests

from django.db import models
from django.conf import settings
from student.models import CourseEnrollment
from edx_proctoring.models import ProctoredExamStudentAttempt
from eventtracking import tracker as eventtracking

log = logging.getLogger(__name__)


class OSPPEnrollmentFeature(models.Model):
    enrollment = models.OneToOneField(
        CourseEnrollment,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name='ospp_feature'
    )
    partner_logo = models.TextField(null=True)
    eligibility_status = models.BooleanField(default=False)


def on_proctoring_attempts_save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
):
    TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

    super(ProctoredExamStudentAttempt, self).save(
        force_insert=force_insert,
        force_update=force_update,
        using=using,
        update_fields=update_fields,
    )
    data = {
        'username': self.user.username,
        'courseOfferingId': self.proctored_exam.course_id,
        'status': self.status,
        'proctoringId': self.id,
        'examName': self.proctored_exam.exam_name,
        'attemptCode': self.attempt_code,
        'startedAt': self.started_at.strftime(TIME_FORMAT) if self.started_at else 'null',
        'completedAt': self.completed_at.strftime(TIME_FORMAT) if self.completed_at else 'null',
        'lastPollTimestamp': self.last_poll_timestamp.strftime(TIME_FORMAT) if self.last_poll_timestamp else 'null',
        'lastPollIpaddr': self.last_poll_ipaddr,
        'externalId': self.external_id,
        'allowedTimeLimitMins': self.allowed_time_limit_mins,
        'takingAsProctored': 'true' if self.taking_as_proctored else 'false',
        'isSampleAttempt': 'true' if self.is_sample_attempt else 'false',
        'reviewPolicyId': self.review_policy_id,
    }
    url = getattr(settings, 'ASU_API_URL', '') + "/api/proctoring"
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    result = requests.patch(url, json=data, headers=headers)
    log.info("Server response with code: " + str(result.status_code) + " and body: " + str(result.json()))


# Hook for implement custom save method for the library model `ProctoredExamStudentAttempt`
ProctoredExamStudentAttempt.save = on_proctoring_attempts_save
