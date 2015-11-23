from django import forms


class FeedbackForm(forms.Form):
    full_name = forms.CharField(max_length=255)
    email = forms.EmailField()
    phone = forms.CharField(required=False, max_length=255)
    i_am_a = forms.CharField(required=False, max_length=255)
    inquiry_type = forms.CharField(max_length=255)
    message = forms.CharField()
