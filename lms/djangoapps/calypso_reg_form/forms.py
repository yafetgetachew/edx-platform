from django import forms
from django.conf import settings
from django.utils.translation import ugettext as _

from calypso_reg_form.models import ExtraInfo, StateExtraInfo


US_STATE_FORM_CHOICES = [(state_abbr, _(state_title)) for state_abbr, state_title in settings.US_STATE_CHOICES]
US_STATE_FORM_CHOICES.insert(0, ('', '--'))


class ExtraInfoForm(forms.ModelForm):

    state = forms.ChoiceField(choices=US_STATE_FORM_CHOICES,
                              label=_('U.S. State'),
                              required=True,
                              error_messages={'required': _('Please select your U.S. State')})

    license = forms.CharField(label=_('License'),
                              required=True,
                              error_messages={'required': _('Please enter your License')})

    class Meta:
        model = ExtraInfo
        exclude = ['user', ]

    def save_extra(self, commit=True):
        state = self.cleaned_data.get('state')
        license = self.cleaned_data.get('license')

        StateExtraInfo.objects.create(extra_info=self.instance,
                                      state=state,
                                      license=license.strip())

        return self.instance
