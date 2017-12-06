# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import openedx.core.djangoapps.xmodule_django.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bulk_email', '0005_move_target_data'),
    ]

    operations = [
        migrations.CreateModel(
            name='SetPasswordEmail',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('course_id', openedx.core.djangoapps.xmodule_django.models.CourseKeyField(max_length=255, db_index=True)),
                ('sended_emails', models.TextField(null=True, blank=True)),
                ('failed_emails', models.TextField(null=True, blank=True)),
                ('sended', models.IntegerField(default=0, blank=True)),
                ('failed', models.IntegerField(default=0, blank=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('sender', models.ForeignKey(default=1, blank=True, to=settings.AUTH_USER_MODEL, null=True)),
            ],
        ),
        migrations.AlterField(
            model_name='courseemail',
            name='from_addr',
            field=models.CharField(default='127.0.0.1:8000', max_length=255, null=True),
        ),
    ]
