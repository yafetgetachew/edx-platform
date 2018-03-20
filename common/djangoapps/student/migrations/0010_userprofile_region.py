# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0009_auto_20180316_1519'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='region',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
