from django.contrib import admin

from full_calendar.models import FullCalendarEvent


@admin.register(FullCalendarEvent)
class FullCalendarEventAdmin(admin.ModelAdmin):
    list_display = ('instructor', 'start_date', 'place',)
    date_hierarchy = 'start_date'
    search_fields = ('instructor',)
