# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('program_marketing', '0004_programmarketing_program_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='MiscSection',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=128)),
                ('description', models.TextField()),
                ('order', models.PositiveIntegerField()),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='WillLearn',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='programmarketing',
            name='promo_image_url',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='curriculumcmspage',
            name='misc_sections',
            field=models.ManyToManyField(to='program_marketing.MiscSection'),
        ),
        migrations.AddField(
            model_name='curriculumcmspage',
            name='will_learn',
            field=models.ManyToManyField(to='program_marketing.WillLearn'),
        ),
    ]
