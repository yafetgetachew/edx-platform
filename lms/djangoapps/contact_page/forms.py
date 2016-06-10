#-*-coding: utf8-*-
from django import forms
from django.conf import settings
from django.core.mail import send_mail
from django.utils.translation import ugettext as _


class ContactForm(forms.Form):
    ROLES = (
        (_('Student'),) * 2,
        (_('Teacher'),) * 2,
        (_('Language institution'),) * 2
    )
    role = forms.CharField(
        widget=forms.Select(choices=ROLES,), label=_("I am a:"))

    text = forms.CharField(
        widget=forms.Textarea(
            attrs={'cols': 65,
                   'rows': 20,
                   'class': 'form-field',
                   'style': 'height: 80px;'
                   }
                              ),
        label=_("Comment:")
    )

    def save(self):
        if self.cleaned_data['text'] and self.cleaned_data['role']:
            subject = '[EDX] "%(role)s" has send email from contact page' % self.cleaned_data
            message = '"%(role)s" message:\n    %(text)s' % self.cleaned_data

            send_mail(subject, message, settings.DEFAULT_FROM_EMAIL,
                      [settings.CONTACT_EMAIL], fail_silently=False)
