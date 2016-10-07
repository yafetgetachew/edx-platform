"""Learner dashboard views"""
from urlparse import urljoin

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.core.urlresolvers import reverse
from django.http import Http404
from django.views.decorators.http import require_GET
from django.shortcuts import render

from edxmako.shortcuts import render_to_response
from openedx.core.djangoapps.credentials.utils import get_programs_credentials
from openedx.core.djangoapps.programs.models import ProgramsApiConfig
from openedx.core.djangoapps.programs import utils
from lms.djangoapps.learner_dashboard.utils import (
    FAKE_COURSE_KEY,
    strip_course_id
)

from .models import ProgramMarketing, CurriculumCMSPage


@require_GET
def marketing(request, program_id):
    """View details about a specific program."""
    programs_config = ProgramsApiConfig.current()
    if not programs_config.show_program_details:
        raise Http404

    if not request.user.is_authenticated():
        user, _ = User.objects.get_or_create(
            username='programs_dummy_user_for_api'
        )
    else:
        user = request.user

    program_data = utils.get_programs(user, program_id=program_id)

    if not program_data:
        raise Http404

    marketing = ProgramMarketing.objects.filter(
        marketing_slug=program_data.get('marketing_slug')
    ).first()

    if not marketing:
        raise Http404

    marketing_data = {'description': marketing.description}

    program_data = utils.supplement_program_data(program_data, user)

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


@require_GET
def explore_programs(request):
    """Explore programs by MKTG_URLS."""
    programs_config = ProgramsApiConfig.current()
    if not programs_config.show_program_listing:
        raise Http404

    if not request.user.is_authenticated():
        user, _ = User.objects.get_or_create(
            username='programs_dummy_user_for_api'
        )
    else:
        user = request.user

    meter = utils.ProgramProgressMeter(user)
    programs = meter.programs

    # TODO: Pull 'xseries' string from configuration model.
    marketing_root = urljoin(settings.MKTG_URLS.get('ROOT'), 'xseries').rstrip('/')

    for program in programs:
        program['detail_url'] = reverse(
            'program_marketing',
            kwargs={'program_id': program['id']}
        ).rstrip('/')
        program['display_category'] = utils.get_display_category(program)

    context = {
        'programs': programs,
        'xseries_url': marketing_root if programs_config.show_xseries_ad else None,
        'nav_hidden': True,
        'show_program_listing': programs_config.show_program_listing,
        'credentials': get_programs_credentials(request.user, category='xseries'),
        'disable_courseware_js': True,
        'uses_pattern_library': True
    }

    return render_to_response('program_marketing/explore_programs.html', context)


@require_GET
def curriculum(request, slug=None):
    """
    Render curriculum with a programs list.
    """
    programs_config = ProgramsApiConfig.current()
    if not programs_config.show_program_listing:
        raise Http404

    if slug:
        curriculum = CurriculumCMSPage.objects.filter(slug=slug).first()
    else:
        curriculum = CurriculumCMSPage.objects.all().first()
    if not curriculum:
        raise Http404

    programs = curriculum.programs.all()

    if not request.user.is_authenticated():
        user, _ = User.objects.get_or_create(
            username='programs_dummy_user_for_api'
        )
    else:
        user = request.user

    programs_data = {
        program.marketing_slug: utils.get_programs(user, program_id=program.program_id)
        for program in programs
    }

    return render(
        request,
        'program_marketing/curriculum.html',
        {
            'curriculum': curriculum,
            'programs_data': programs_data,
            'programs': programs
        }
    )
