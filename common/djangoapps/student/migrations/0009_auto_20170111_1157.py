# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0008_auto_20170104_1706'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(blank=True, max_length=6, null=True, db_index=True, choices=[(b'm', b'Male'), (b'f', b'Female')]),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='position',
            field=models.CharField(blank=True, max_length=30, null=True, choices=[(b'primary_teacher', b'Primary school teacher'), (b'middle_teacher', b'Middle school teacher'), (b'secondary_teacher', b'Secondary school teacher'), (b'senior_teacher', b'Senior high school teacher'), (b'other_teacher', b'Other')]),
        ),
    ]
