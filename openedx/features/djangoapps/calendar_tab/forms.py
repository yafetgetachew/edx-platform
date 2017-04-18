from django import forms
from apiclient import discovery


class EventForm(forms.Form):
    """Form for Google Calendar event creation"""
    title = forms.CharField()
    description = forms.CharField(widget=forms.Textarea, required=False)
    start = forms.DateTimeField()
    end = forms.DateTimeField()

    def create_event(self):
        """Performs Google Calendar API event.insert request"""
        print(self.cleaned_data)

        key = "AIzaSyCMoABDkdDl_74tg8FebGRRy3a4Nbk97-U"
        calendar_id = "raccoongang.com_1ihbicvrp826c79c331lk1a0qo@group.calendar.google.com"

        gcal_service = discovery.build('calendar', 'v3', developerKey=key)
        event = {
            'summary': 'Google I/O 2017',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google.',
            'start': {
                'dateTime': '2017-04-19T05:00:00-03:00',
            },
            'end': {
                'dateTime': '2017-04-19T15:00:00-03:00',
            },
        }

        event = gcal_service.events().insert(calendarId=calendar_id, body=event).execute()
        print 'Event created: %s' % (event.get('htmlLink'))
        print(dir(event))
