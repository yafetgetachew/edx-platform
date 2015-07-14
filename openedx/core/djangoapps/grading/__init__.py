from stevedore.extension import ExtensionManager


GRADING_POLICY_NAMESPACE = 'openedx.grading_policy'


class GradingPolicyError(Exception):
    """An error occurred in the Grading Policy App. """
    pass


def get_grading_class(name):
    """Returns a pluggin by the `name(str)`."""
    extension = ExtensionManager(namespace=GRADING_POLICY_NAMESPACE)
    try:
        return extension[name].plugin
    except KeyError:
        raise GradingPolicyError("Unrecognized grader {0}".format(name))
