from django import forms
from django.utils.translation import ugettext as _

I_AM_A = (
    ('', '-- select --'),
    ('student', _("Student")),
    ('professor', _("Professor")),
    ('journalist', _("Journalist")),
    ('administrator', _("University Administrator")),
    ('other', _("Other"))
)

INQUIRY_TYPE = (
    ('', '-- select --'),
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
    email = forms.EmailField(label=_('You e-mail'), max_length=255)
    full_name = forms.CharField(label=_('Full name'), max_length=255)
    phone = forms.CharField(label=_('You phone'), max_length=16, required=False)
    i_am_a = forms.ChoiceField(choices=I_AM_A, required=True)
    inquiry_type = forms.ChoiceField(choices=INQUIRY_TYPE, required=True)
    message = forms.CharField(label=_('Message'), widget=forms.Textarea)

    @property
    def get_data(self):
        base_result = self.cleaned_data
        base_result['i_am_a'] = self._get_value_of_select('i_am_a', base_result['i_am_a'])
        base_result['inquiry_type'] = self._get_value_of_select('inquiry_type', base_result['inquiry_type'])
        return base_result

    def as_ul_with_class(self, css_classes):
        "Return this form rendered as HTML <li class=''>s -- excluding the <ul></ul>."
        return self._html_output(
            normal_row='<li class="{css_classes}">%(errors)s%(label)s %(field)s%(help_text)s</li>'.format(css_classes=css_classes),
            error_row='<li>%s</li>',
            row_ender='</li>',
            help_text_html=' <span class="helptext">%s</span>',
            errors_on_separate_row=False,
        )

    def save(self):
        raise NotImplementedError

    def _get_value_of_select(self, select_field_name, key):
        select = self.fields.get(select_field_name)
        for k, v in select.choices:
           if key == k or str(key) == str(k):
                return v

