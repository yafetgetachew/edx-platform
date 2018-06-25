from django.contrib import admin

from calypso_reg_form.models import ExtraInfo, LicenseExtraInfo, USStateExtraInfo


class LicenseInline(admin.TabularInline):
    model = LicenseExtraInfo


class USStateInline(admin.TabularInline):
    model = USStateExtraInfo


class ExtraInfoAdmin(admin.ModelAdmin):
    inlines = [
        LicenseInline,
        USStateInline,
    ]

admin.site.register(ExtraInfo, ExtraInfoAdmin)
