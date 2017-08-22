from student.models import CourseEnrollment

def courses_language_filter(courses, language=None):
    from courseware.courses import get_course_by_id
    def _filter(c):
        if isinstance(c, CourseEnrollment):
            c = get_course_by_id(c.course.id)
        else:
            c = get_course_by_id(c.id)
        return c.language == language

    return language and filter(_filter, courses) or courses
