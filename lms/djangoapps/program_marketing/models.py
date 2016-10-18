from django.db import models


class WillLearn(models.Model):
    """
    You will learn section parts.
    """
    text = models.CharField(max_length=255)


class MiscSection(models.Model):
    """
    Dynamically added misc section.
    """
    title = models.CharField(max_length=128)
    description = models.TextField()
    order = models.PositiveIntegerField()

    class Meta:
        ordering = ['order']


class ProgramMarketing(models.Model):
    """
    Contains program marketing attributes.
    """
    marketing_slug = models.SlugField(max_length=64)
    title = models.CharField(max_length=128, blank=True)
    # TODO avoid using program_id
    program_id = models.PositiveIntegerField(blank=True, null=True)
    description = models.TextField()
    promo_video_url = models.URLField(blank=True)
    promo_image_url = models.URLField(blank=True)


class CurriculumCMSPage(models.Model):
    """
    Contains data for curriculum page.
    """
    slug = models.SlugField(max_length=64)
    title = models.CharField(max_length=128)
    description = models.TextField()
    will_learn = models.ManyToManyField(WillLearn)
    misc_sections = models.ManyToManyField(MiscSection)
    video_url = models.URLField()
    programs = models.ManyToManyField(ProgramMarketing)
