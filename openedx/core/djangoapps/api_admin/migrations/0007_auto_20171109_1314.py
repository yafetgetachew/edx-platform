# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_admin', '0006_catalog'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiaccessrequest',
            name='reason',
            field=models.TextField(help_text='La raison pour laquelle cet utilisateur d\xe9sire acc\xe9der au API.'),
        ),
        migrations.AlterField(
            model_name='apiaccessrequest',
            name='status',
            field=models.CharField(default=b'pending', help_text="Statut de cette requ\xeate API d'acc\xe8s", max_length=255, db_index=True, choices=[(b'pending', 'En attente'), (b'denied', 'Refus\xe9'), (b'approved', 'Approuv\xe9')]),
        ),
        migrations.AlterField(
            model_name='apiaccessrequest',
            name='website',
            field=models.URLField(help_text='Le URL du site web associ\xe9 avec cet utilisateur API.'),
        ),
        migrations.AlterField(
            model_name='historicalapiaccessrequest',
            name='reason',
            field=models.TextField(help_text='La raison pour laquelle cet utilisateur d\xe9sire acc\xe9der au API.'),
        ),
        migrations.AlterField(
            model_name='historicalapiaccessrequest',
            name='status',
            field=models.CharField(default=b'pending', help_text="Statut de cette requ\xeate API d'acc\xe8s", max_length=255, db_index=True, choices=[(b'pending', 'En attente'), (b'denied', 'Refus\xe9'), (b'approved', 'Approuv\xe9')]),
        ),
        migrations.AlterField(
            model_name='historicalapiaccessrequest',
            name='website',
            field=models.URLField(help_text='Le URL du site web associ\xe9 avec cet utilisateur API.'),
        ),
    ]
