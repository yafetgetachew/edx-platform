# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import localflavor.us.models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtraInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone', models.CharField(max_length=255, verbose_name='Phone')),
                ('address', models.CharField(max_length=255, verbose_name='Address')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='LicenseExtraInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('license', models.CharField(max_length=255, verbose_name='License')),
                ('extra_info', models.ForeignKey(to='calypso_reg_form.ExtraInfo')),
            ],
        ),
        migrations.CreateModel(
            name='USStateExtraInfo',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('state', localflavor.us.models.USStateField(max_length=2, verbose_name='State')),
                ('extra_info', models.ForeignKey(to='calypso_reg_form.ExtraInfo')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='usstateextrainfo',
            unique_together=set([('extra_info', 'state')]),
        ),
        migrations.AlterUniqueTogether(
            name='licenseextrainfo',
            unique_together=set([('extra_info', 'license')]),
        ),
    ]
