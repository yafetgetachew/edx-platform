from student.models import CourseEnrollment
from django.core.management.base import BaseCommand
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from xmodule.modulestore.django import modulestore
from student.tasks import send_users_report


class Command(BaseCommand):
    def handle(self, *args, **options):
        send_users_report()
