# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0006_logoutviewconfiguration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='languageproficiency',
            name='code',
            field=models.CharField(help_text='The ISO 639-1 language code for this language.', max_length=16, choices=[['ar', '\u0627\u0644\u0639\u0631\u0628\u064a\u0651\u0629'], ['en', '\u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0651\u0629']]),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='gender',
            field=models.CharField(blank=True, max_length=6, null=True, db_index=True, choices=[(b'm', b'Male'), (b'f', b'Female')]),
        ),
    ]
