import logging
from stevedore.extension import ExtensionManager
from django.conf import settings

GRADING_POLICY_NAMESPACE = 'openedx.grading_policy'

log = logging.getLogger(__name__)


class GradingPolicyError(Exception):
    """An error occurred in the Grading Policy App."""
    pass


def get_grading_class(name):
    """Returns a pluggin by the `name(str)`."""
    extension = ExtensionManager(namespace=GRADING_POLICY_NAMESPACE)
    try:
        return extension[name].plugin
    except KeyError:
        raise GradingPolicyError("Unrecognized grader {0}".format(name))


# @TODO: Temporary solution that will be replaced in the future. We use this
# decorator to avoid merge conflict.
def use_custom_grading(method_name):
    """Uses a custom grading algorithm or native depends on settings."""

    def decorator(func):
        def wrapper(*args, **kwargs):
            if settings.FEATURES['ENABLE_CUSTOM_GRADING']:
                grader = get_grading_class(settings.GRADING_TYPE)
                return getattr(grader, method_name)(*args, **kwargs)
            else:
                return func(*args, **kwargs)

        return wrapper

    return decorator


def get_grading_type():
    """
    :return: grading type if ENABLE_CUSTOM_GRADING else return default value
    """
    if settings.FEATURES['ENABLE_CUSTOM_GRADING']:
        allowed_types = ('vertical', 'sequential')
        grading_type = settings['GRADING_TYPE']
        try:
            assert grading_type['GRADING_TYPE'] in allowed_types
        except AssertionError:
            log.warning("You must define valid GRADING_TYPE in settings")
        return grading_type
    return 'sequential'
