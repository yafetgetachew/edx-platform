from django.db import models
from django.conf import settings
from hvad.models import TranslatableModel, TranslatedFields


def get_pages():
    pages = []

    for key, value in settings.MKTG_URL_LINK_MAP.items():
        if value is None or key == "ROOT" or key == "COURSES":
            continue

        template = "%s.html" % key.lower()

        pages.append((template, value))

    return tuple(pages)


class InfoPage(TranslatableModel):
    PAGES = get_pages()

    page = models.CharField(max_length=50, choices=PAGES, unique=True)
    translations = TranslatedFields(
        title = models.CharField(max_length=255),
        text = models.TextField()
    )

    def __unicode__(self):
        return self.page
