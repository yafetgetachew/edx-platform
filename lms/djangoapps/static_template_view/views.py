# View for semi-static templatized content.
#
# List of valid templates is explicitly managed for (short-term)
# security reasons.

from edxmako.shortcuts import render_to_response, render_to_string
from mako.exceptions import TopLevelLookupException
from django.shortcuts import redirect
from django.conf import settings
from django.http import HttpResponseNotFound, HttpResponseServerError, Http404
from django.views.decorators.csrf import ensure_csrf_cookie

from util.cache import cache_if_anonymous

# Additional imports for feedback form
from static_template_view.forms import FeedbackForm
from django.core.mail import send_mail
from smtplib import SMTPException
from django.middleware.csrf import get_token

valid_templates = []

if settings.STATIC_GRAB:
    valid_templates = valid_templates + [
        'server-down.html',
        'server-error.html'
        'server-overloaded.html',
    ]


def index(request, template):
    if template in valid_templates:
        return render_to_response('static_templates/' + template, {})
    else:
        return redirect('/')


@ensure_csrf_cookie
def render(request, template):
    """
    This view function renders the template sent without checking that it
    exists. Do not expose template as a regex part of the url. The user should
    not be able to ender any arbitray template name. The correct usage would be:

    url(r'^jobs$', 'static_template_view.views.render', {'template': 'jobs.html'}, name="jobs")
    """

    notification = None
    style = ''
    context = {}

    if settings.FEATURES.get('USE_CUSTOM_THEME', False):
        if request.method == 'POST':
            form = FeedbackForm(request.POST)
            if form.is_valid():
                data_form = form.cleaned_data
                subject = 'feedback'

                full_message = \
                u'Full name: {full_name} \nEmail: {email} \nPhone: {phone} \nI am a: {i_am_a} \nInquiry type: {inquiry_type} \n{message} '.format(
                    full_name=data_form['full_name'],
                    email=data_form['email'],
                    phone=data_form.get('phone', ''),
                    i_am_a=data_form.get('i_am_a', ''),
                    inquiry_type=data_form['inquiry_type'],
                    message=data_form['message']
                    )
                try:
                    send_mail(subject, full_message, data_form['email'], [settings.TECH_SUPPORT_EMAIL,], fail_silently=False,)
                    notification = 'Message was successfuly sent. Thank you for contacting us!'
                except SMTPException as e:
                    notification = 'Message not been sent, please try again later'
                style = 'style="margin-top:10px;"'
        else:
            form = FeedbackForm()

        csrf_token = get_token(request)
        context = {
            'csrf_token': csrf_token,
            'message': notification,
            'style': style,
            'form': form
        }

    return render_to_response('static_templates/' + template, context)


@ensure_csrf_cookie
@cache_if_anonymous()
def render_press_release(request, slug):
    """
    Render a press release given a slug.  Similar to the "render" function above,
    but takes a slug and does a basic conversion to convert it to a template file.
    a) all lower case,
    b) convert dashes to underscores, and
    c) appending ".html"
    """
    template = slug.lower().replace('-', '_') + ".html"
    try:
        resp = render_to_response('static_templates/press_releases/' + template, {})
    except TopLevelLookupException:
        raise Http404
    else:
        return resp


def render_404(request):
    return HttpResponseNotFound(render_to_string('static_templates/404.html', {}))


def render_500(request):
    return HttpResponseServerError(render_to_string('static_templates/server-error.html', {}))
