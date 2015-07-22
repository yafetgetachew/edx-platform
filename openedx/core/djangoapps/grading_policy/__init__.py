from django.conf import settings


class GradingPolicyError(Exception):
    """An error occurred in the Grading Policy App."""
    pass


def is_valid_grading_type(grading_type):
    return grading_type in settings.GRADING_ALLOWED_TYPES


def get_grading_type(course):
    """Returns grading type depends on settings."""
    grading_type = course.grading_type
    if is_valid_grading_type(grading_type):
        return grading_type
    else:
        raise GradingPolicyError(
            "You must define valid GRADING_TYPE, your type {}, allowed_types are {}".format(
                grading_type, settings.GRADING_ALLOWED_TYPES
            )
        )
