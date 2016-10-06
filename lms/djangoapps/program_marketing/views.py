"""Learner dashboard views"""
from urlparse import urljoin

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import Http404
from django.views.decorators.http import require_GET

from edxmako.shortcuts import render_to_response
from openedx.core.djangoapps.credentials.utils import get_programs_credentials
from openedx.core.djangoapps.programs.models import ProgramsApiConfig
from openedx.core.djangoapps.programs import utils
from lms.djangoapps.learner_dashboard.utils import (
    FAKE_COURSE_KEY,
    strip_course_id
)

from .models import ProgramMarketing


@login_required
@require_GET
def marketing(request, program_id):
    """View details about a specific program."""
    programs_config = ProgramsApiConfig.current()
    if not programs_config.show_program_details:
        raise Http404

    program_data = utils.get_programs(request.user, program_id=program_id)

    if not program_data:
        raise Http404

    marketing = ProgramMarketing.objects.filter(
        marketing_slug=program_data.get('marketing_slug')
    ).first()

    if not marketing:
        raise Http404

    marketing_data = {'description': marketing.description}

    program_data = utils.supplement_program_data(program_data, request.user)

    urls = {
        'program_listing_url': reverse('program_listing_view'),
        'track_selection_url': strip_course_id(
            reverse('course_modes_choose', kwargs={'course_id': FAKE_COURSE_KEY})
        ),
        'commerce_api_url': reverse('commerce_api:v0:baskets:create'),
    }

    context = {
        'marketing_data': marketing_data,
        'program_data': program_data,
        'urls': urls,
        'show_program_listing': programs_config.show_program_listing,
        'nav_hidden': True,
        'disable_courseware_js': True,
        'uses_pattern_library': True
    }

    return render_to_response('program_marketing/marketing_page.html', context)
