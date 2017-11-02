# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InfoPage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('page', models.CharField(max_length=50, choices=[(b'theme-blog.html', b'blog'), (b'theme-contact.html', b'contact'), (b'theme-donate.html', b'donate'), (b'theme-faq.html', b'faq'), (b'theme-help.html', b'help'), (b'theme-jobs.html', b'jobs'), (b'theme-news.html', b'news'), (b'theme-press.html', b'press'), (b'theme-media-kit.html', b'media-kit'), (b'about.html', 'about'), (b'privacy.html', 'privacy'), (b'tos.html', 'tos'), (b'contact.html', 'contact'), (b'honor.html', 'honor'), (b'what_is_verified_cert.html', 'verified-certificate'), (b'faq.html', 'help'), (b'blog.html', 'blog'), (b'press.html', 'press'), (b'donate.html', 'donate'), (b'sitemap.xml.html', b'sitemap_xml')])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='InfoPageTranslation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255)),
                ('text', models.TextField()),
                ('language_code', models.CharField(max_length=15, db_index=True)),
                ('master', models.ForeignKey(related_name='translations', editable=False, to='info_pages.InfoPage', null=True)),
            ],
            options={
                'managed': True,
                'abstract': False,
                'db_table': 'info_pages_infopage_translation',
                'db_tablespace': '',
                'default_permissions': (),
            },
        ),
        migrations.AlterUniqueTogether(
            name='infopagetranslation',
            unique_together=set([('language_code', 'master')]),
        ),
    ]
