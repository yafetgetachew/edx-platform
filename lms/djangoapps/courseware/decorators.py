import json
from .courses import get_courses


def course_filtering(fn):
    def wrapper(request, *args, **kwargs):
        response = fn(request, *args, **kwargs)
        try:
            content = json.loads(response.content)
        except:
            return response
        else:
            course_ids = [str(course.id) for course in get_courses(user=request.user)]
            content['results'] = [r for r in content['results'] if r['_id'] in course_ids]
            content['total'] = len(content['results'])
            response.content = json.dumps(content)
            return response

    return wrapper 
