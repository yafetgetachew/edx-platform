from django import forms

i_am_a_choice = (
    ('', '-- select --'),
    ('student', 'Student'),
    ('professor', 'Professor'),
    ('journalist', 'Journalist'),
    ('administrator', 'University Administrator'),
    ('other', 'Other'),
)

inquiry_choice = (
    ('', '-- select --'),
    ('registration', 'Question about Registration and Activation'),
    ('technical', 'I am having a Technology Problem'),
    ('accessibility', 'Question about Accessibility for students with disabilities'),
    ('exams', 'Question about Certification and Exams'),
    ('account', 'My account details need changing'),
    ('university', 'Business development / Institutional inquiry'),
    ('harrassment', 'Report unethical or harassing conduct'),
    ('other', 'Other...'),
)


class FeedbackForm(forms.Form):
    full_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    phone = forms.CharField(required=False, max_length=255)
    i_am_a = forms.CharField(required=False,  widget=forms.Select(choices=i_am_a_choice))
    inquiry_type = forms.CharField(widget=forms.Select(choices=inquiry_choice))
    message = forms.CharField(widget=forms.Textarea(attrs={'cols': '60',
                                                           'rows': '5'}))
