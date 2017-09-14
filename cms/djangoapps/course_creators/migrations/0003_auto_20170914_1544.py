# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('course_creators', '0002_auto_20170320_1357'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursecreator',
            name='note',
            field=models.CharField(help_text="\u041d\u0435\u043e\u0431\u043e\u0432'\u044f\u0437\u043a\u043e\u0432\u0456 \u043d\u043e\u0442\u0430\u0442\u043a\u0438 \u043f\u0440\u043e \u0446\u044c\u043e\u0433\u043e \u043a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447\u0430 (\u043d\u0430\u043f\u0440\u0438\u043a\u043b\u0430\u0434, \u0447\u043e\u043c\u0443 \u0443 \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u043d\u0456 \u043a\u0443\u0440\u0441\u0443 \u0431\u0443\u043b\u043e \u0432\u0456\u0434\u043c\u043e\u0432\u043b\u0435\u043d\u043e)", max_length=512, blank=True),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='state',
            field=models.CharField(default=b'unrequested', help_text='\u041f\u043e\u0442\u043e\u0447\u043d\u0438\u0439 \u0441\u0442\u0430\u043d \u0437\u0430\u0441\u043d\u043e\u0432\u043d\u0438\u043a\u0430 \u043a\u0443\u0440\u0441\u0443', max_length=24, choices=[(b'unrequested', '\u043d\u0435 \u0437\u0430\u043f\u0438\u0442\u0430\u043d\u0435'), (b'pending', '\u0432 \u043e\u0447\u0456\u043a\u0443\u0432\u0430\u043d\u043d\u0456'), (b'granted', '\u043d\u0430\u0434\u0430\u043d\u043e'), (b'denied', '\u0432\u0456\u0434\u043c\u043e\u0432\u043b\u0435\u043d\u043e')]),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='state_changed',
            field=models.DateTimeField(help_text='\u0414\u0430\u0442\u0430 \u043e\u0441\u0442\u0430\u043d\u043d\u044c\u043e\u0457 \u0437\u043c\u0456\u043d\u0438 \u0441\u0442\u0430\u043d\u0443', verbose_name=b'state last updated', auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='coursecreator',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL, help_text='\u041a\u043e\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 \u0441\u0442\u0443\u0434\u0456\u0457'),
        ),
    ]
