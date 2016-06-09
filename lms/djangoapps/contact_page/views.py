# -*-coding: utf8-*-
from django.shortcuts import redirect
from django.contrib import messages
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie

from edxmako.shortcuts import render_to_response
from smtplib import SMTPException

from forms import ContactForm

@ensure_csrf_cookie
def contact_page(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            try:
                form.save()
            except SMTPException:
                messages.error(request, 'Message not been sent, please try again later')
            else:
                messages.success(request, ('Message was successfuly sent. '
                                           'Thank you for contacting us!'))
                return redirect(request.build_absolute_uri())
    else:
        form = ContactForm()

    csrf_token = get_token(request)

    return render_to_response('contact_page.html',
                              {'csrf_token': csrf_token, 'form': form})
