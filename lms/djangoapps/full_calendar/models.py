from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _

from openedx.core.djangoapps.xmodule_django.models import CourseKeyField


class FullCalendarEvent(models.Model):
    course_id = CourseKeyField(max_length=255, verbose_name=_("Course"), null=True, blank=True)
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="instructor_events")
    place = models.TextField()
    title = models.CharField(max_length=255, null=True, blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    price = models.IntegerField()
    currency = models.CharField(default="usd", max_length=8)
    max_seats = models.PositiveSmallIntegerField(default=12)
    students = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="student_events")

