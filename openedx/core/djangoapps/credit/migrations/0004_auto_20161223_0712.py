# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('credit', '0003_auto_20160511_2227'),
    ]

    operations = [
        migrations.AlterField(
            model_name='creditconfig',
            name='cache_ttl',
            field=models.PositiveIntegerField(default=0, help_text='Especificado em segundos. Ativar armazenamento em cache, definindo este como um valor maior que 0.', verbose_name='Tempo de dura\xe7\xe3o de mem\xf3ria'),
        ),
    ]
