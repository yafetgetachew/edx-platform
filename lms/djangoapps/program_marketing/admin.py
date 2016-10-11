"""
Admin interface for LTI Provider app.
"""

from django.contrib import admin

from .models import (
    ProgramMarketing,
    CurriculumCMSPage,
    WillLearn,
    MiscSection,
)


class ProgramMarketingAdmin(admin.ModelAdmin):
    """Admin for ProgramMarketing"""
    list_display = ('marketing_slug', 'description', 'promo_video_url')


class CurriculumCMSPageAdmin(admin.ModelAdmin):
    """Admin for CurriculumCMSPage"""
    list_display = ('slug', 'title', 'description')
    filter_horizontal = ('programs', 'will_learn', 'misc_sections')


admin.site.register(ProgramMarketing, ProgramMarketingAdmin)
admin.site.register(CurriculumCMSPage, CurriculumCMSPageAdmin)
admin.site.register(WillLearn, admin.ModelAdmin)
admin.site.register(MiscSection, admin.ModelAdmin)
