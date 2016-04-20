# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('course_creators', '0002_auto_20160420_1701'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursecreator',
            name='user',
            field=models.OneToOneField(related_name='coursecreator', to=settings.AUTH_USER_MODEL, help_text='\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c Studio'),
        ),
    ]
