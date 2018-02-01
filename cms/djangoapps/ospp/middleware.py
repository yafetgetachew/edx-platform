import re
from opaque_keys import InvalidKeyError
from opaque_keys.edx.keys import CourseKey
from courseware.access import has_access
from edxmako.shortcuts import render_to_response


class FromStudentProtectMiddleware(object):
    COURSE_PATTERN = r'([^/:]+:[^/+]+\+[^/+]+\+[^/]+)'
    DEPRECATED_COURSE_PATTERN = r'([^/]+/[^/]+/[^/]+)'

    def process_request(self, request):
        course_id_regexp = (
                re.search(self.COURSE_PATTERN, request.path)
                or re.search(self.DEPRECATED_COURSE_PATTERN, request.path)
        )
        if course_id_regexp:
            course_id = course_id_regexp.group(1)
            try:
                course_key = CourseKey.from_string(course_id)
            except InvalidKeyError:
                is_forbidden = True
            else:
                is_forbidden = not has_access(request.user, 'instructor', course_key)
        else:
            is_forbidden = not request.user.is_staff

        if is_forbidden:
            return render_to_response('ospp/now_allowed_user.html', {})
