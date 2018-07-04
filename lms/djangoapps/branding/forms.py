from django import forms
from django.conf import settings
from django.core.mail import send_mail
from django.utils.translation import ugettext as _

I_AM_A = (
    ('student', _("Student")),
    ('professor', _("Professor")),
    ('journalist', _("Journalist")),
    ('administrator', _("University Administrator")),
    ('other', _("Other"))
)

INQUIRY_TYPE = (
    ('registration', _("Question about Registration and Activation")),
    ('technical', _("I am having a Technology Problem")),
    ('accessibility', _("Question about Accessibility for students with disabilities")),
    ('exams', _("Question about Certification and Exams")),
    ('account', _("My account details need changing")),
    ('university', _("Business development / Institutional inquiry")),
    ('harrassment', _("Report unethical or harassing conduct")),
    ('other', _("Other"))
)


class ContactForm(forms.Form):
    full_name = forms.CharField(label=_('You name'), max_length=255)
    email = forms.EmailField(label=_('You e-mail'), max_length=255)
    phone = forms.CharField(label=_('You phone'), max_length=16, required=False)
    message = forms.CharField(label=_('Message'), widget=forms.Textarea)
    i_am_a = forms.ChoiceField(choices=I_AM_A, required=True)
    inquiry_type = forms.ChoiceField(choices=INQUIRY_TYPE, required=True)

    def get_status_form(self):
        if not self.is_valid():
            return self.is_valid(), self.errors().as_data()
        else:
            return self.is_valid(), {}

    def save(self):
        raise NotImplementedError

    # def send_mail(self):
    #     if self.is_valid():
    #          separator = '-' * 16
    #          message = '{}\n{}\n{}\n{}\n\n{}'.format(
    #              self.cleaned_data['full_name'],
    #              self.cleaned_data['email'],
    #              self.cleaned_data['phone'],
    #              separator,
    #              self.cleaned_data['message']
    #          )
    #          send_mail(self.cleaned_data['subject'], message, settings.DEFAULT_FROM_EMAIL,
    #                            [settings.CONTACT_EMAIL])
    #          return True
    #     return False