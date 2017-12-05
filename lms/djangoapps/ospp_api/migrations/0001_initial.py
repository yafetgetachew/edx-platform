# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0010_auto_20170207_0458'),
    ]

    operations = [
        migrations.CreateModel(
            name='OSPPEnrollmentFeature',
            fields=[
                ('enrollment', models.OneToOneField(related_name='ospp_feature', primary_key=True, serialize=False, to='student.CourseEnrollment')),
                ('partner_logo', models.TextField(null=True)),
                ('eligibility_status', models.BooleanField(default=False)),
            ],
        ),
    ]
