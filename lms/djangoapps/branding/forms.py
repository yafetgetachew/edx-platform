from django import forms
from django.conf import settings
from django.core.mail import send_mail
from django.utils.translation import ugettext as _


class ContactForm(forms.Form):
    name = forms.CharField(label=_('You name'), max_length=255)
    email = forms.EmailField(label=_('You e-mail'), max_length=255)
    subject = forms.CharField(label=_('Subject'), max_length=255)
    phone = forms.CharField(label=_('You phone'), max_length=16, required=False)
    message = forms.CharField(label=_('Message'), widget=forms.Textarea, required=False)

    def save(self):
        if self.is_valid():
            separator = '-' * 16
            message = '{}\n{}\n{}\n{}\n\n{}'.format(
                self.cleaned_data['name'],
                self.cleaned_data['email'],
                self.cleaned_data['phone'],
                separator,
                self.cleaned_data['message']
            )
            send_mail(self.cleaned_data['subject'], message, settings.DEFAULT_FROM_EMAIL, [settings.CONTACT_EMAIL])
            return True
        return False
