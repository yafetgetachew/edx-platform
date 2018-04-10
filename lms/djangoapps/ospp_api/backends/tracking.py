import logging

from abc import ABCMeta, abstractmethod
from django.conf import settings
from django.core.cache import cache

from track.backends import BaseBackend

log = logging.getLogger(__name__)

OSPP_TRACKER_CACHE_KEY = 'ospp.tracker'
OSPP_TRACKER_CACHE_KEY_ALL_TASK = '{}.all'.format(OSPP_TRACKER_CACHE_KEY)

class StatisticProcessor(object):
    """
    Base class for process statistic item.
    """
    __metaclass__ = ABCMeta

    YES = 'Y'
    NO = 'N'
    TIME_FORMAT = '%Y-%m-%d %H:%M:%S'

    @abstractmethod
    def is_can_process(self, event):
        """
        Return True if current processor can process task.

        Attention - don`t modify event object
        """
        pass

    @abstractmethod
    def process(self, event):
        """
        Process log event.

        Return dictionary with data, specific for this event.

        Attention - don`t modify event object.
        """
        pass

    def get_event_timestamp_as_string(self, event):
        return (event['time'] if 'time' in event else event['timestamp']).strftime(self.TIME_FORMAT)

    @staticmethod
    def get_event_name(event):
        if 'event_type' in event:
            return event['event_type']
        return event['name']

    @staticmethod
    def get_event_user(event):
        if 'username' in event:
            return event['username']
        return event['context']['username']


class LastLoginStaticsProcessor(StatisticProcessor):

    def is_can_process(self, event):
        try:
            course_id = event['context']['course_id']
        except KeyError:
            log.warning("Cannot process the event: {}".format(event))
            return False
        return course_id is not None and len(course_id) > 0

    def process(self, event):
        return {
            'lastLoginInCourse': self.get_event_timestamp_as_string(event)
        }


class GradeStaticsProcessor(StatisticProcessor):

    def is_can_process(self, event):
        return (
                self.get_event_name(event) == 'problem_check'
                and 'event' in event
                and event['event']['success'] == 'correct'
        )

    def process(self, event):
        return {
            'finalGrade': 'need calculation'
        }


class CreditEligibilityProcessor(StatisticProcessor):

    def is_can_process(self, event):
        return self.get_event_name(event) == 'credit.CreditEligibility'

    def process(self, event):
        return {
            'creditEligible': event['data']['creditEligible']
        }


class CreditProcessor(StatisticProcessor):

    def is_can_process(self, event):
        return self.get_event_name(event) == 'credit.request.created'

    def process(self, event):
        timestamp = self.get_event_timestamp_as_string(event)
        result = {
            'creditConverted': 'Y',
            'creditConvertedDate': timestamp,
            'courseCompletedDate': timestamp,
        }
        return result


class EnrollmentProcessor(StatisticProcessor):

    def is_can_process(self, event):
        return self.get_event_name(event) == 'common.student.CourseEnrollment'

    def process(self, event):
        result = {
            'enrollmentMode': event['data']['mode'],
            'enrollmentModeDate': self.get_event_timestamp_as_string(event),
        }
        return result


class TrackingBackend(BaseBackend):

    cache_lifetime = getattr(settings, 'ASU_CACHE_LIFETIME', 60 * 60 * 24 * 30)

    def __init__(self, **kwargs):
        super(TrackingBackend, self).__init__(**kwargs)

        self.statistic_processors = [
            LastLoginStaticsProcessor(),
            GradeStaticsProcessor(),
            CreditProcessor(),
            CreditEligibilityProcessor(),
            CreditProcessor(),
            EnrollmentProcessor(),
        ]

    def send(self, event):
        for processor in self.statistic_processors:
            if processor.is_can_process(event):
                body = processor.process(event)
                if not body:
                    continue
                username = StatisticProcessor.get_event_user(event)
                course_id = event['context']['course_id']

                cached_item_tag = '.'.join([OSPP_TRACKER_CACHE_KEY, username, course_id])
                cached_item = cache.get(cached_item_tag)
                if not cached_item:
                    cached_item = {'body': body, 'username': username, 'course_id': course_id}
                else:
                    cached_item['body'].update(body)
                cache.set(cached_item_tag, cached_item, self.cache_lifetime)
                all_task = cache.get(OSPP_TRACKER_CACHE_KEY_ALL_TASK, set())
                all_task.add(cached_item_tag)
                cache.set(OSPP_TRACKER_CACHE_KEY_ALL_TASK, all_task, self.cache_lifetime)
