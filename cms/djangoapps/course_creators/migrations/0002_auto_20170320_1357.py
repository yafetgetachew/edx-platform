# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_creators', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursecreator',
            name='state',
            field=models.CharField(default=b'unrequested', help_text='Current course creator state', max_length=24, choices=[(b'unrequested', 'unrequested'), (b'pending', '\u0432 \u043e\u0447\u0456\u043a\u0443\u0432\u0430\u043d\u043d\u0456'), (b'granted', 'granted'), (b'denied', 'denied')]),
        ),
    ]
