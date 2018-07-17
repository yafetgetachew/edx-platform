from django import forms
from django.contrib import messages
from django.shortcuts import redirect
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext as _

from edxmako.shortcuts import render_to_response

from .forms import SetNationalIdForm


def set_national_id(request):
    if request.method == 'POST':
        form = SetNationalIdForm(request.POST)
        if form.is_valid():
            form.save()
            messages.add_message(request, messages.INFO, _('You National ID updated successfully. Now you can log in using it.'))
            return redirect(reverse('signin_user'))
    elif request.method == 'GET':
        form = SetNationalIdForm()

    return render_to_response('set_national_id.html', {'form': form})
