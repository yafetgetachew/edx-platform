from django import forms
from django.utils.translation import ugettext as _

from localflavor.us.us_states import STATE_CHOICES

from calypso_reg_form.models import ExtraInfo, LicenseExtraInfo, USStateExtraInfo


class ExtraInfoForm(forms.ModelForm):
    """
    Up to 3 states and licenses
    """
    STATE_CHOICES = list(STATE_CHOICES)
    STATE_CHOICES.insert(0, ('', '--'))
    state = forms.ChoiceField(
        widget=forms.Select,
        choices=STATE_CHOICES,
        label=_('U.S. state'),
    )
    state2 = forms.ChoiceField(
        widget=forms.Select,
        choices=STATE_CHOICES,
        label=_('Additional U.S. state'),
        required=False,
    )
    state3 = forms.ChoiceField(
        widget=forms.Select,
        choices=STATE_CHOICES,
        label=_('Additional U.S. state'),
        required=False,
    )

    license = forms.CharField(label=_('License'))
    license2 = forms.CharField(label=_('Additional license'), required=False)
    license3 = forms.CharField(label=_('Additional license'), required=False)

    def clean_state2(self):
        state = self.cleaned_data.get('state')
        state2 = self.cleaned_data['state2']
        if state2 != '' and (state == state2):
            raise forms.ValidationError(_('Please choose different additional U.S. state'))
        return state2

    def clean_state3(self):
        state = self.cleaned_data.get('state')
        state2 = self.cleaned_data.get('state2')
        state3 = self.cleaned_data['state3']
        if state3 != '' and (state in (state2, state3) or state2 == state3):
            raise forms.ValidationError(_('Please choose different additional U.S. state'))
        return state3

    def clean_license2(self):
        license = self.cleaned_data.get('license')
        license2 = self.cleaned_data['license2']
        if license2 != '' and (license == license2):
            raise forms.ValidationError(_('Please enter different license'))
        return license2

    def clean_license3(self):
        license = self.cleaned_data.get('license')
        license2 = self.cleaned_data.get('license2')
        license3 = self.cleaned_data['license3']
        if license3 != '' and (license in (license2, license3) or (license2 == license3)):
            raise forms.ValidationError(_('Please enter different license'))
        return license3

    def save_extra(self, commit=True):
        USStateExtraInfo.objects.filter(extra_info=self.instance).delete()
        LicenseExtraInfo.objects.filter(extra_info=self.instance).delete()

        for state in (self.cleaned_data['state'],
                      self.cleaned_data.get('state2'),
                      self.cleaned_data.get('state3'),):
            if state:
                USStateExtraInfo.objects.create(
                    extra_info=self.instance,
                    state=state,
                )

        for license in (self.cleaned_data['license'],
                        self.cleaned_data.get('license2'),
                        self.cleaned_data.get('license3'),):
            if license:
                LicenseExtraInfo.objects.create(
                    extra_info=self.instance,
                    license=license.strip(),
                )
        return self.instance

    class Meta:
        model = ExtraInfo
        exclude = ['user', ]
