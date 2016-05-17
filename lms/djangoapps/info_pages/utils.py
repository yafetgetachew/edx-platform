from .models import InfoPage


def get_text_for_template(template, language='en'):
    return InfoPage.objects.language(language).filter(page=template).first()
