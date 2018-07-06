from django import forms
from django.utils.translation import ugettext as _

I_AM_A = {
    '': '-- select --',
    1: _("Student"),
    2: _("Professor"),
    3: _("Journalist"),
    4: _("University Administrator"),
    5: _("Other")
}

INQUIRY_TYPE = {
    '': '-- select --',
    1: _("Question about Registration and Activation"),
    2: _("I am having a Technology Problem"),
    3: _("Question about Accessibility for students with disabilities"),
    4: _("Question about Certification and Exams"),
    5: _("My account details need changing"),
    6: _("Business development / Institutional inquiry"),
    7: _("Report unethical or harassing conduct"),
    8: _("Other")
}


class ContactForm(forms.Form):
    email = forms.EmailField(label=_('You e-mail'), max_length=255)
    full_name = forms.CharField(label=_('Full name'), max_length=255)
    phone = forms.CharField(label=_('You phone'), max_length=16, required=False)
    i_am_a = forms.ChoiceField(choices=I_AM_A.items(), required=True)
    inquiry_type = forms.ChoiceField(choices=INQUIRY_TYPE.items(), required=True)
    message = forms.CharField(label=_('Message'), widget=forms.Textarea)

    @property
    def get_data(self):
        base_result = self.cleaned_data
        base_result['i_am_a'] = I_AM_A[int(base_result['i_am_a'])]
        base_result['inquiry_type'] = INQUIRY_TYPE[int(base_result['inquiry_type'])]
        return base_result

    def as_ul_with_class(self, css_classes):
        "Return this form rendered as HTML <li class=''>s -- excluding the <ul></ul>."
        return self._html_output(
            normal_row=(
                '<li class="{css_classes}">%(errors)s%(label)s %(field)s%(help_text)s</li>'.
                format(css_classes=css_classes)
            ),
            error_row='<li>%s</li>',
            row_ender='</li>',
            help_text_html=' <span class="helptext">%s</span>',
            errors_on_separate_row=False,
        )

    def save(self):
        raise NotImplementedError


