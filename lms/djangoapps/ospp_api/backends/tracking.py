from abc import ABCMeta, abstractmethod
from datetime import datetime as dt
import logging

from django.conf import settings

from ospp_api import tasks as celery_task
from track.backends import BaseBackend

log = logging.getLogger(__name__)


class StatisticProcessor(object):
    """
    Base class for process statistic item.
    """
    __metaclass__ = ABCMeta

    YES = 'Y'
    NO = 'N'

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

    @staticmethod
    def get_event_timestamp(event):
        if 'time' in event:
            return event['time']
        return event['timestamp']

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


class LastLoginStaticsOperator(StatisticProcessor):

    def is_can_process(self, event):
        try:
            course_id = event['context']['course_id']
        except KeyError:
            log.warning("Cannot process the event: {}".format(event))
            return False
        return course_id is not None and len(course_id) > 0

    def process(self, event):
        return {
            'lastLoginInCourse': self.get_event_timestamp(event).strftime("%Y-%m-%d %H:%M:%S")
        }


class TrackingBackend(BaseBackend):

    def __init__(self, **kwargs):
        super(TrackingBackend, self).__init__(**kwargs)

        self.max_statistic_buffer_size = getattr(settings, 'ASU_TRACKER_BUFFER_SIZE', 10)
        self.max_statistic_buffer_life_time = getattr(settings, 'ASU_TRACKER_BUFFER_LIFE_TIME', 60)
        self.statistic_processors = [
            LastLoginStaticsOperator(),
        ]

        self.statistic = {}
        self.statistic_item_count = 0
        self.last_statistic_submit = dt.now()

    def send(self, event):
        for processor in self.statistic_processors:
            if processor.is_can_process(event):
                body = processor.process(event)
                course_id = event['context']['course_id']
                username = StatisticProcessor.get_event_user(event)
                statistic_id = (username, course_id)
                if statistic_id in self.statistic:
                    self.statistic[statistic_id].update(body)
                else:
                    self.statistic[statistic_id] = body
                    self.statistic_item_count += 1
                if (
                    self.statistic_item_count > self.max_statistic_buffer_size
                    or (
                        (dt.now()-self.last_statistic_submit).seconds > self.max_statistic_buffer_life_time
                        and self.statistic
                    )
                ):
                    self.send_statistic()

    def send_statistic(self):
        self.statistic_item_count = 0
        data_for_send = self.statistic
        self.last_statistic_submit = dt.now()
        self.statistic = {}
        celery_task.send_statistic.delay(data_for_send)
