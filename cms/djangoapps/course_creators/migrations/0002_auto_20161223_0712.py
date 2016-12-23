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
            name='note',
            field=models.CharField(help_text='Notas opcionais sobre este usu\xe1rio (por exemplo, a raz\xe3o pela qual o acesso \xe0 cria\xe7\xe3o do curso foi negado)', max_length=512, blank=True),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='state',
            field=models.CharField(default=b'unrequested', help_text='Estado atual do criador do curso', max_length=24, choices=[(b'unrequested', 'n\xe3o solicitado'), (b'pending', 'pendente'), (b'granted', 'concedido'), (b'denied', 'negado')]),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='state_changed',
            field=models.DateTimeField(help_text='Data da \xfaltima atualiza\xe7\xe3o do estado', verbose_name=b'state last updated', auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL, help_text='Usur\xe1rio do Studio'),
        ),
    ]
