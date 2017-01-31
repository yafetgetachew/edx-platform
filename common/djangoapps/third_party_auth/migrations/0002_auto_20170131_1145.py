# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('third_party_auth', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='oauth2providerconfig',
            name='backend_name',
            field=models.CharField(help_text=b'Which python-social-auth OAuth2 provider backend to use. The list of backend choices is determined by the THIRD_PARTY_AUTH_BACKENDS setting.', max_length=50, db_index=True, choices=[(b'microsoft-oauth2', b'microsoft-oauth2'), (b'cms-microsoft-oauth2', b'cms-microsoft-oauth2')]),
        ),
    ]
