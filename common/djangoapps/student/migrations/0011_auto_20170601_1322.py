# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0010_auto_20170531_1028'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='hear',
            field=models.CharField(blank=True, max_length=32, null=True, choices=[(b'icnc_website', 'ICNC Website'), (b'icnc_email', 'Email from ICNC'), (b'icnc_staff', 'ICNC Staff or Adviser (please list name below)'), (b'icnc_fb_or_twitter', 'ICNC Facebook or Twitter'), (b'social_media', 'Other social media outlet (please specify below)'), (b'email', 'Email listserv (please specify name below)'), (b'website', 'Other website or forum (please specify name below)'), (b'friend_or_colleague', 'Friend or colleague'), (b'university_announcement', 'University announcement'), (b'mentor', 'Mentor professor or student'), (b'other', 'Other (please specify below)')]),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='prefix',
            field=models.CharField(blank=True, max_length=32, null=True, choices=[(b'Ms.', 'Ms.'), (b'Mrs.', 'Mrs.'), (b'Miss', 'Miss'), (b'Mr.', 'Mr.'), (b'Dr.', 'Dr.'), (b'Prof.', 'Prof.'), (b'Rev.', 'Rev.'), (b'other', 'Other [Require fill-in]'), (None, 'None')]),
        ),
    ]
