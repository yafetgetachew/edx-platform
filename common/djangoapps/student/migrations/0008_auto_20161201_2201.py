# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import django_countries.fields


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0007_auto_20161114_2239'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='aim_of_studying',
            field=models.CharField(blank=True, max_length=10, null=True, choices=[(b'buisness', b'Entrepreneurship business'), (b'job', b'Getting a job'), (b'promoted', b'Get promoted'), (b'skills', b'Skills development')]),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='nationality',
            field=django_countries.fields.CountryField(blank=True, max_length=2, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='phone',
            field=models.CharField(max_length=12, null=True, blank=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='phone_country_code',
            field=models.CharField(max_length=5, null=True, blank=True),
        ),
    ]
