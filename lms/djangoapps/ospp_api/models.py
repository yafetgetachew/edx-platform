
from django.db import models

from student.models import CourseEnrollment


class OSPPEnrollmentFeature(models.Model):
    enrollment = models.OneToOneField(
            CourseEnrollment,
            on_delete=models.CASCADE,
            primary_key=True,
            related_name='ospp_feature'
    )
    partner_logo = models.TextField(null=True)
    eligibility_status = models.BooleanField(default=False)


