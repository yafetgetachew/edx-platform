from student.models import CourseEnrollment


def _access_country(course, country):
    if isinstance(course, CourseEnrollment):
        course = course.course
    if country in course.display_name_with_default[-5:] or 'CAM' in course.display_name_with_default[-5:]:
        return True
    else:
        return False


def country_filter(courses, country=None):
    '''
    Filtering of courses by last 3 words of country code, example Ireland - IRE, can be used (),
    example (IRE)
    '''

    if country:
        courses = [c for c in courses if _access_country(c, country)]
    return courses
