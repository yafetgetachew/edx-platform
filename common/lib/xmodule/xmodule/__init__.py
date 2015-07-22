try:
    from openedx.core.djangoapps.grading_policy.grading import CourseGrading  # pylint: disable=import-error
except ImportError:
    class CourseGrading:
        @classmethod
        def grading_context(cls, course):
            return {
                'graded_sections': [],
                'all_descriptors': [],
            }
