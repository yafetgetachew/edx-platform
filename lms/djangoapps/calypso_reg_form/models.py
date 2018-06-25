from django.conf import settings
from django.db import models
from django.utils.translation import ugettext as _
from localflavor.us.models import USStateField


class ExtraInfo(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL)

    phone = models.CharField(
        verbose_name=_('Phone'),
        max_length=255,
    )

    address = models.CharField(
        verbose_name=_('Address'),
        max_length=255,
    )

    def __unicode__(self):
        return unicode(self.user)


class LicenseExtraInfo(models.Model):
    extra_info = models.ForeignKey('ExtraInfo')
    license = models.CharField(
        verbose_name=_('License'),
        max_length=255,
    )

    class Meta:
        unique_together = ('extra_info', 'license',)


class USStateExtraInfo(models.Model):
    extra_info = models.ForeignKey('ExtraInfo')
    state = USStateField(
        verbose_name=_('State'),
    )

    class Meta:
        unique_together = ('extra_info', 'state',)
