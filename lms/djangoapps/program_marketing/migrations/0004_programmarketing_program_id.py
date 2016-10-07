# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('program_marketing', '0003_auto_20161007_0950'),
    ]

    operations = [
        migrations.AddField(
            model_name='programmarketing',
            name='program_id',
            field=models.PositiveIntegerField(null=True, blank=True),
        ),
    ]
