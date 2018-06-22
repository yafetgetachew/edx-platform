import json

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie

from edxmako.shortcuts import render_to_response

from full_calendar.models import FullCalendarEvent


@login_required
@ensure_csrf_cookie
def main(request):
    events = []
    for ev in FullCalendarEvent.objects.filter(instructor=request.user):
        events.append({
            "title": ev.title,
            "start": ev.start_date.isoformat(),
            "end": ev.end_date.isoformat(),
            "id": ev.id,
            "number_of_students": ev.students.count(),
            "place": ev.place,
            "price": ev.price,
            "currency": ev.currency,
            "max_seats": ev.max_seats,

        })

    context = {
        'calendar_events': events
    }
    return render_to_response('full_calendar/main.html', context)
