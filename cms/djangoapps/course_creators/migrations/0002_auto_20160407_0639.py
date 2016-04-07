# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('course_creators', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursecreator',
            name='user',
            field=models.OneToOneField(related_name='course_creator', to=settings.AUTH_USER_MODEL, help_text='Studio user'),
        ),
    ]
