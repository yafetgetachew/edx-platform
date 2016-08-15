# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0002_auto_20151208_1034'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='phone',
            field=models.CharField(max_length=13, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='position',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='qualification',
            field=models.CharField(blank=True, max_length=25, null=True, db_index=True, choices=[(b'doctor', 'Doctor'), (b'nursing_staff', 'Nursing staff'), (b'nurses', 'Nurses'), (b'practical_psychologist', 'Practical psychologist'), (b'social_worker', 'Social Worker'), (b'not_medical_staff', 'Not medical staff')]),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='work',
            field=models.CharField(max_length=255, null=True, blank=True),
        ),
        migrations.AlterField(
            model_name='courseenrollment',
            name='mode',
            field=models.CharField(default=b'honor', max_length=100),
        ),
        migrations.AlterField(
            model_name='historicalcourseenrollment',
            name='mode',
            field=models.CharField(default=b'honor', max_length=100),
        ),
    ]
