# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProgramMarketing',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('marketing_slug', models.SlugField(max_length=64)),
                ('description', models.TextField()),
                ('promo_video_url', models.URLField()),
            ],
        ),
    ]
