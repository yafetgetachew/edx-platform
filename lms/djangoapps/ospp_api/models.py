
from django.db import models

from student.models import CourseEnrollment
from edx_proctoring.models import ProctoredExamStudentAttempt
from eventtracking import tracker as eventtracking


class OSPPEnrollmentFeature(models.Model):
    enrollment = models.OneToOneField(
            CourseEnrollment,
            on_delete=models.CASCADE,
            primary_key=True,
            related_name='ospp_feature'
    )
    partner_logo = models.TextField(null=True)
    eligibility_status = models.BooleanField(default=False)


def on_proctoring_attempts_save(self, force_insert=False, force_update=False, using=None,
             update_fields=None):
    tracker = eventtracking.get_tracker()
    context = {
        'username':self.user.username,
        'course_id':self.proctored_exam.course_id
    }
    with tracker.context('custom_user_context', context):
        tracker.emit('ospp.proctoring.attempts.change', {
            'status': self.status
        })
    super(ProctoredExamStudentAttempt, self).save(
            force_insert=force_insert,
            force_update=force_update,
            using=using,
            update_fields=update_fields,
    )


# Hook for implement custom save method for the library model `ProctoredExamStudentAttempt`
ProctoredExamStudentAttempt.save = on_proctoring_attempts_save

