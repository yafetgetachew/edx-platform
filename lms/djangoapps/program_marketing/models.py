from django.db import models


class ProgramMarketing(models.Model):
    """
    Contains program marketing attributes.
    """
    marketing_slug = models.SlugField(max_length=64)
    description = models.TextField()
    promo_video_url = models.URLField()
