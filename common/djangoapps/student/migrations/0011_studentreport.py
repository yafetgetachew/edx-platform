# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import openedx.core.djangoapps.xmodule_django.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('student', '0010_userprofile_region'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentReport',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('course_id', openedx.core.djangoapps.xmodule_django.models.CourseKeyField(db_index=True, max_length=255, blank=True)),
                ('fname', models.CharField(default='N/A', max_length=255)),
                ('lname', models.CharField(default='N/A', max_length=255)),
                ('email', models.CharField(default='N/A', max_length=255)),
                ('job', models.CharField(default='N/A', max_length=255)),
                ('org', models.CharField(default='N/A', max_length=255)),
                ('country', models.CharField(default='N/A', max_length=255)),
                ('region', models.CharField(default='N/A', max_length=255)),
                ('mooc_name', models.CharField(default='N/A', max_length=255)),
                ('mooc_number', models.CharField(default='N/A', max_length=255)),
                ('mooc_code', models.CharField(default='N/A', max_length=255)),
                ('mooc_status', models.CharField(default='N/A', max_length=255)),
                ('course_start', models.CharField(default='N/A', max_length=255)),
                ('course_end', models.CharField(default='N/A', max_length=255)),
                ('certified', models.CharField(default='N/A', max_length=255)),
                ('cocd', models.CharField(default='N/A', max_length=255)),
                ('price', models.CharField(default='N/A', max_length=255)),
                ('currency', models.CharField(default='N/A', max_length=255)),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
