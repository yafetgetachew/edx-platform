# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import openedx.core.djangoapps.xmodule_django.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='FullCalendarEvent',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('course_id', openedx.core.djangoapps.xmodule_django.models.CourseKeyField(max_length=255, null=True, verbose_name='Course', blank=True)),
                ('place', models.TextField()),
                ('title', models.CharField(max_length=255, null=True, blank=True)),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('price', models.IntegerField()),
                ('currency', models.CharField(default=b'usd', max_length=8)),
                ('max_seats', models.PositiveSmallIntegerField(default=12)),
                ('instructor', models.ForeignKey(related_name='instructor_events', to=settings.AUTH_USER_MODEL)),
                ('students', models.ManyToManyField(related_name='student_events', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
