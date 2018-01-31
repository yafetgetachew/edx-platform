"""
Common utility functions related to courses.
"""
from django.conf import settings

from xmodule.modulestore.django import modulestore
from xmodule.contentstore.content import StaticContent
from xmodule.modulestore import ModuleStoreEnum


def course_image_url(course, field_name='course_image'):
    """Try to look up the image url for the course.  If it's not found,
    log an error and return the dead link"""
    if course.static_asset_path or modulestore().get_modulestore_type(course.id) == ModuleStoreEnum.Type.xml:
        # If we are a static course with the course_image attribute
        # set different than the default, return that path so that
        # courses can use custom course image paths, otherwise just
        # return the default static path.
        url = '/static/' + (course.static_asset_path or getattr(course, 'data_dir', ''))
        if hasattr(course, field_name) and getattr(course, field_name) != course.fields[field_name].default:
            url += '/' + getattr(course, field_name)
        else:
            url += course.fields[field_name].default
    elif hasattr(course, field_name) and not getattr(course, field_name):
        url = ''
        # if course_image is empty, use the default image url from settings
        if field_name == 'course_image' and hasattr(settings, 'DEFAULT_COURSE_ABOUT_IMAGE_URL'):
            url = settings.STATIC_URL + settings.DEFAULT_COURSE_ABOUT_IMAGE_URL
    else:
        loc = StaticContent.compute_location(course.id, getattr(course, field_name))
        url = StaticContent.serialize_asset_key_with_slash(loc)
    return url
