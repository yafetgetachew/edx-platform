"""
Tests for edx_global_analytics application cache helper functions aka utils.
"""

import datetime

from django.test import TestCase
from django.utils import timezone

from django.db.models import Q

from student.models import UserProfile
from student.tests.factories import UserFactory

from ..utils import cache_instance_data


class TestCacheInstanceData(TestCase):
    """
    Tests cover cache-functionality for queries results.
    """
    @staticmethod
    def create_cache_instance_data_default_database_data():
        """
        Default integration database data for cache instance information tests.
        """
        users_last_login = [
            timezone.make_aware(datetime.datetime(2017, 5, 8, 0, 0, 0), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 14, 23, 59, 59), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 15, 0, 0, 0), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 15, 0, 0, 1), timezone.get_default_timezone())
        ]

        for user_last_login in users_last_login:
            UserFactory(last_login=user_last_login)

    def test_cache_instance_data(self):
        """
        Verifies that cache_instance_data returns data as expected after caching it.
        """
        self.create_cache_instance_data_default_database_data()

        period_start, period_end = datetime.date(2017, 5, 8), datetime.date(2017, 5, 15)

        active_students_amount_week = UserProfile.objects.exclude(
            Q(user__last_login=None) | Q(user__is_active=False)
        ).filter(user__last_login__gte=period_start, user__last_login__lt=period_end).count()

        cache_timeout = None

        result = cache_instance_data('active_students_amount_week', active_students_amount_week, cache_timeout)

        self.assertEqual(result, 2)
