from django.db import transaction
from django.db.models import Prefetch
from django.db.models.functions import Lower
from django.utils.decorators import method_decorator
from rest_framework import (
    mixins,
    parsers as drf_parsers,
    viewsets,
)

from programs.apps.programs import models
from programs.apps.api import (
    filters,
    parsers as edx_parsers,
    permissions as edx_permissions,
    serializers,
)


def program_marketing(request, slug):
    """
    Return marketing page for program.
    """
    programs_config = ProgramsApiConfig.current()
    if not programs_config.show_program_details:
        raise Http404

    program_data = utils.get_programs(request.user, program_id=program_id)

    if not program_data:
        raise Http404

    program_data = utils.supplement_program_data(program_data, request.user)

    urls = {
        'program_listing_url': reverse('program_listing_view'),
        'track_selection_url': strip_course_id(
            reverse('course_modes_choose', kwargs={'course_id': FAKE_COURSE_KEY})
        ),
        'commerce_api_url': reverse('commerce_api:v0:baskets:create'),
    }

    context = {
        'program_data': program_data,
        'urls': urls,
        'show_program_listing': programs_config.show_program_listing,
        'nav_hidden': True,
        'disable_courseware_js': True,
        'uses_pattern_library': True
    }

    return render_to_response('learner_dashboard/program_details.html', context)
    return render(request, template_name='program_marketing/marketing_page.html')
