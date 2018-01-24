from django.core.management.base import BaseCommand, CommandError
from django.db.models import F, Func, Value, Q
from courseware.models import StudentModule
from student.models import CourseEnrollment
from opaque_keys.edx.keys import CourseKey
from logging import getLogger


log = getLogger(__name__)


class Command(BaseCommand):
    args = "<old_course_id> <new_course_id>"

    def handle(self, *args, **options):
        if len(args) != 2 or filter(lambda s: not s.startswith('course-v1:'), args):
            raise CommandError('Must specify old_course_id and new_course_id: e.g. course-v1:edX+DemoX+Demo_Course course-v1:edX+DemoX+Demo_Course_T1')

        old, new = map(CourseKey.from_string, args)

        if CourseEnrollment.objects.filter(course_id=old).exists():
            log.info('Transfer course progress...')
            CourseEnrollment.objects.filter(course_id=new).delete()
            CourseEnrollment.objects.filter(course_id=old).update(course_id=new)
            StudentModule.objects.filter(course_id=new).delete()
            StudentModule.objects.filter(course_id=old).update(
                course_id=new,
                module_state_key=Func(
                    F('module_state_key'),
                    Value('block-v1:{}'.format(old.to_deprecated_string()[10:])),
                    Value('block-v1:{}'.format(new.to_deprecated_string()[10:])),
                    function='replace',
                )
            )
            log.info('Done')
        else:
            log.info('No one enrolled on the course')
