import re
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey

from courseware.access import has_access
from edxmako.shortcuts import render_to_response
from student.models import CourseAccessRole


class FromStudentProtectMiddleware(object):
    COURSE_PATTERN = r'([^/:]+:[^/+]+\+[^/+]+\+[^/]+)(\+type@|/|[$]?)'
    LIB_PATTERN = r'([^/:]+:[^/+]+\+[^/+]+)(\+type@|/|[$]?)'
    DEPRECATED_COURSE_PATTERN = r'([^/]+/[^/]+/[^/]+)'

    def process_request(self, request):
        course_id_regexp = (
                re.search(self.COURSE_PATTERN, request.path)
                or re.search(self.DEPRECATED_COURSE_PATTERN, request.path)
        )

        if course_id_regexp:
            # convert item locator to the course ID.
            course_id = course_id_regexp.group(1)
            if 'block-v1:' in course_id:
                course_id = course_id.replace('block-v1:', 'course-v1:')
            if 'lib' in course_id.split(';')[0]:
                course_id = re.search(self.LIB_PATTERN, course_id).group(1)
                if 'lib-block-v1' in course_id:
                    course_id = course_id.replace('lib-block-v1', 'library-v1')
                elif 'lib-course-v1' in course_id:
                    course_id = course_id.replace('lib-course-v1', 'library-v1')
            try:
                course_key = CourseKey.from_string(course_id)
            except InvalidKeyError:
                is_forbidden = True
            else:
                is_forbidden = not (
                        has_access(request.user, 'instructor', course_key)
                        or has_access(request.user, 'staff', course_key)
                )
        else:
            is_forbidden = not CourseAccessRole.objects.filter(
                user__id=request.user.id,
                role__in=['instructor', 'staff']
            ).exists()

        if is_forbidden:
            return render_to_response('ospp/now_allowed_user.html', {})