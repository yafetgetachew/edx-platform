"""
Tests for edX global analytics application functions, that calculate statistics.
"""

import datetime

from mock import patch

from django.test import TestCase
from django.utils import timezone
from django_countries.fields import Country

from student.tests.factories import UserFactory

from openedx.core.djangoapps.edx_global_analytics.utils.cache_utils import cache_timeout_week
from openedx.core.djangoapps.edx_global_analytics.utils.utils import fetch_instance_information


class TestStudentsAmountPerParticularPeriod(TestCase):
    """
    Cover all methods, that have a deal with statistics calculation.
    """

    @staticmethod
    def create_default_data():
        """
        Default integration database data for active students amount functionality.
        """
        users_last_login = [
            timezone.make_aware(datetime.datetime(2017, 5, 14, 23, 59, 59), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 15, 0, 0, 0), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 15, 23, 59, 59), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 16, 0, 0, 0), timezone.get_default_timezone()),
            timezone.make_aware(datetime.datetime(2017, 5, 16, 0, 0, 1), timezone.get_default_timezone())
        ]

        for user_last_login in users_last_login:
            UserFactory(last_login=user_last_login)

    def test_fetch_active_students(self):
        """
        Verify that fetch_instance_information returns data as expected in particular period and accurate datetime.

        We have no reason to test week and month periods for active students amount,
        all queries are the same, we just go test only day period.
        """
        self.create_default_data()

        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        result = fetch_instance_information(
            'active_students_amount_day', 'active_students_amount', activity_period, cache_timeout
        )

        self.assertEqual(2, result)

    def test_fetch_students_per_country(self):
        """
        Verify that students_per_country returns data as expected in particular period and accurate datetime.
        """
        last_login = timezone.make_aware(datetime.datetime(2017, 5, 15, 14, 23, 23), timezone.get_default_timezone())
        countries = [u'US', u'CA']

        for country in countries:
            user = UserFactory.create(last_login=last_login)
            profile = user.profile
            profile.country = Country(country)
            profile.save()

        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        result = fetch_instance_information(
            'students_per_country', 'students_per_country', activity_period, cache_timeout
        )

        self.assertItemsEqual({u'US': 1, u'CA': 1}, result)

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.cache_utils.cache_instance_data')
    def test_caching_students_with_timeout(self, mock_cache_instance_data):
        """
        Verify that cache_instance_data called during fetch instance information method is occurring
        with not none `cache_timeout`.
        """
        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = cache_timeout_week()

        fetch_instance_information(
            'students_per_country', 'students_per_country', activity_period, cache_timeout
        )

        mock_cache_instance_data.assert_called_once()

    def test_no_students_with_country(self):
        """
        Verify that students_per_country returns data as expected if no students with country.
        """
        last_login = timezone.make_aware(datetime.datetime(2017, 5, 15, 14, 23, 23), timezone.get_default_timezone())

        UserFactory.create(last_login=last_login)

        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        result = fetch_instance_information(
            'students_per_country', 'students_per_country', activity_period, cache_timeout
        )

        self.assertEqual({None: 0}, result)
