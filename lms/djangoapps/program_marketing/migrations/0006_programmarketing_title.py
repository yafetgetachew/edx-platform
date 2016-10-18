# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('program_marketing', '0005_auto_20161011_1324'),
    ]

    operations = [
        migrations.AddField(
            model_name='programmarketing',
            name='title',
            field=models.CharField(max_length=128, blank=True),
        ),
    ]
