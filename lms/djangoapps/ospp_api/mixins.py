from abc import abstractmethod, ABCMeta
from django.views.generic import View

from edxmako.shortcuts import render_to_response, render_to_string
from ospp_api.utils import get_learner_info, apply_user_status_to_enroll
from student.models import CourseEnrollment


class MethodViewWithMakoMixin(object):
    """
    Uses for wrap methodbase view to manipulate context for template render.

    Implement view_module for define parent view module. After that use next construction
    self.get_patched_module(request).method_base_view(args), where method_base_view - name of the view
    and args - original set of arguments.

    Note: work only with views, that use render_to_response or render_to_string from the edxmako.shortcuts module,
    when render template.
    """

    __metaclass__ = ABCMeta

    def get_patched_module(self, original_request):
        def custom_actions(dictionary):
            dictionary = self.update_context(original_request, dictionary or {})

        def patched_render_to_response(
                template_name, dictionary=None, context_instance=None, namespace='main', request=None, **kwargs
        ):
            custom_actions(dictionary)
            return render_to_response(template_name, dictionary, context_instance, namespace, request, **kwargs)

        def patched_render_to_string(template_name, dictionary, context=None, namespace='main', request=None):
            custom_actions(dictionary)
            return render_to_string(template_name, dictionary, context, namespace, request)

        module = self.view_module()
        module.render_to_response = patched_render_to_response
        module.render_to_string = patched_render_to_string
        return module

    @abstractmethod
    def view_module(self):
        """
        Return object of the module, that contain`s target method-base view.

        Example:
            from module import submodule
            return submodule
        """
        pass

    @abstractmethod
    def update_context(self, request, context):
        """
        Update context before template render

        Return new context
        """
        pass


class EligibleCheckViewMixin(View):
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated():
            student_state = get_learner_info(request.user.id)
            if student_state:
                for enrollment in CourseEnrollment.enrollments_for_user_with_overviews_preload(request.user):
                    apply_user_status_to_enroll(
                        user=request.user,
                        course_enrollment=enrollment,
                        status=student_state,
                    )
        return super(EligibleCheckViewMixin, self).dispatch(request, *args, **kwargs)
