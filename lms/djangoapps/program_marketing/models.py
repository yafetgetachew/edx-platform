from django.db import models


class ProgramMarketing(models.Model):
    """
    Contains program marketing attributes.
    """
    marketing_slug = models.SlugField(max_length=64)
    # TODO avoid using program_id
    program_id = models.PositiveIntegerField(blank=True, null=True)
    description = models.TextField()
    promo_video_url = models.URLField(blank=True)


class CurriculumCMSPage(models.Model):
    """
    Contains data for curriculum page.
    """
    slug = models.SlugField(max_length=64)
    title = models.CharField(max_length=128)
    description = models.TextField()
    video_url = models.URLField()
    programs = models.ManyToManyField(ProgramMarketing)
