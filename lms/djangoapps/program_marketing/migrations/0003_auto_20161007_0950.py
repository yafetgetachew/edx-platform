# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('program_marketing', '0002_curriculumcmspage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='programmarketing',
            name='promo_video_url',
            field=models.URLField(blank=True),
        ),
    ]
