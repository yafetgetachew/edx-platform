# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info_pages', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='infopage',
            name='page',
            field=models.CharField(unique=True, max_length=50, choices=[(b'theme-blog.html', b'blog'), (b'theme-contact.html', b'contact'), (b'theme-donate.html', b'donate'), (b'theme-faq.html', b'faq'), (b'theme-help.html', b'help'), (b'theme-jobs.html', b'jobs'), (b'theme-news.html', b'news'), (b'theme-press.html', b'press'), (b'theme-media-kit.html', b'media-kit'), (b'theme-copyright.html', b'copyright'), (b'about.html', 'about'), (b'privacy.html', 'privacy'), (b'tos.html', 'tos'), (b'contact.html', 'contact'), (b'honor.html', 'honor'), (b'what_is_verified_cert.html', 'verified-certificate'), (b'faq.html', 'help'), (b'blog.html', 'blog'), (b'press.html', 'press'), (b'donate.html', 'donate'), (b'sitemap.xml.html', b'sitemap_xml')]),
        ),
    ]
