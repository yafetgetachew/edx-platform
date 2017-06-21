# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0011_auto_20170601_1322'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='prefix',
            field=models.CharField(max_length=32, null=True, blank=True),
        ),
    ]
