# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('certificates', '0010_auto_20160923_1554'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certificatehtmlviewconfiguration',
            name='configuration',
            field=models.TextField(default=b'{"default": {"accomplishment_class_append": "accomplishment-certificate", "platform_name": "\\u0643\\u0648\\u0651\\u0650\\u0646 \\u0627\\u0644\\u0631\\u0642\\u0645\\u064a\\u0629", "logo_src": "/static/images/logo.png", "logo_url": "", "company_verified_certificate_url": "https://edx.org/verified-certificate", "company_privacy_url": "/privacy", "company_tos_url": "/tos", "company_about_url": "/about"}, "verified": {"certificate_type": "Verified", "certificate_title": "Verified Certificate of Achievement"}, "honor": {"certificate_type": "Honor Code", "certificate_title": "Certificate of Achievement"}}', help_text=b'Certificate HTML View Parameters (JSON)'),
        ),
    ]
