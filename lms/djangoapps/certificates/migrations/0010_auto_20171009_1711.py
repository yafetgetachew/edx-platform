# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('certificates', '0009_auto_20170111_1400'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certificatehtmlviewconfiguration',
            name='configuration',
            field=models.TextField(help_text=b'Certificate HTML View Parameters (JSON)'),
        ),
    ]
