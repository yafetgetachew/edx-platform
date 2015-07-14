from stevedore.extension import ExtensionManager
from django.conf import settings


GRADING_POLICY_NAMESPACE = 'openedx.grading_policy'


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


def use_custom_grading_if_enabled_for(method_name):
    def decorator(func):
        def wrapper(*args, **kwargs):
            if settings.FEATURES['ENABLE_CUSTOM_GRADING']:
                grader = get_grading_class(settings.GRADING_TYPE)
                return getattr(grader, method_name)(*args, **kwargs)
            else:
                return func(*args, **kwargs)
        return wrapper
    return decorator
