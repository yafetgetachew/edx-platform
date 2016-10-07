# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('program_marketing', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CurriculumCMSPage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('slug', models.SlugField(max_length=64)),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField()),
                ('video_url', models.URLField()),
                ('programs', models.ManyToManyField(to='program_marketing.ProgramMarketing')),
            ],
        ),
    ]
