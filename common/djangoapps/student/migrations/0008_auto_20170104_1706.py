# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0007_auto_20170104_1336'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='municipality',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='other_position',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='position',
            field=models.CharField(blank=True, max_length=30, null=True, choices=[(b'other_teacher', b'Other'), (b'primary_teacher', b'Primary school teacher'), (b'middle_teacher', b'Middle school teacher'), (b'secondary_teacher', b'Secondary school teacher'), (b'senior_teacher', b'Senior high school teacher')]),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='school',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
    ]
