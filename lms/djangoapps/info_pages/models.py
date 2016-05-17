from django.conf import settings
from django.db import models
from tinymce.models import HTMLField
from hvad.models import TranslatableModel, TranslatedFields

PAGES = (
    ('theme-blog.html', 'blog'),
    ('theme-contact.html', 'contact'),
    ('theme-donate.html', 'donate'),
    ('theme-faq.html', 'faq'),
    ('theme-help.html', 'help'),
    ('theme-jobs.html', 'jobs'),
    ('theme-news.html', 'news'),
    ('theme-press.html', 'press'),
    ('theme-media-kit.html', 'media-kit'),
    ('theme-tos.html', 'tos')
)


class InfoPage(TranslatableModel):
    page = models.CharField(max_length=50, choices=PAGES)
    translations = TranslatedFields(
        title = models.CharField(max_length=255),
        text = models.TextField()
    )

    def __unicode__(self):
        return self.page

