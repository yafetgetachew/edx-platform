"""
Tests for edX global analytics application functions, that calculate statistics.
"""

import datetime

from mock import patch

from django.test import TestCase
from django.utils import timezone

from django_countries.fields import Country

from student.tests.factories import UserFactory

from ..utils import (
    fetch_instance_information,
    cache_timeout_week,
)


class TestStudentsAmountPerParticularPeriod(TestCase):
    """
    Tests cover all methods, that have a deal with statistics calculation.
    """
    @staticmethod
    def create_active_students_amount_default_database_data():
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

    def test_fetch_instance_information_method_returns_expected_result_for_active_students_amount(self):
        """
        Verifies that fetch_instance_information returns data as expected in particular period and accurate datetime.
        We have no reason to test week and month periods for active students amount,
        all queries are the same, we just go test only day period.
        """
        self.create_active_students_amount_default_database_data()

        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        result = fetch_instance_information(
            'active_students_amount_day', 'active_students_amount', activity_period, cache_timeout
        )

        self.assertEqual(2, result)

    def test_fetch_instance_information_method_raises_key_error_for_active_students_amount_statistics_query_is_missed(
            self
    ):
        """
        Verifies that fetch_instance_information raise `KeyError` if default statistics queries don't have
        corresponding name (dict`s key).
        """
        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        self.assertRaises(KeyError, lambda: fetch_instance_information(
            'active_students_amount_day', 'active_students_amount_day', activity_period, cache_timeout
        ))

    def test_fetch_instance_information_method_raises_type_error_for_active_students_amount_statistics_query_is_missed(
            self
    ):
        """
        Verifies that fetch_instance_information raise `TypeError` if needed datetime objects are missed
        as activity period is None.
        """
        activity_period, cache_timeout = None, None

        self.assertRaises(TypeError, lambda: fetch_instance_information(
            'active_students_amount_day', 'active_students_amount', activity_period, cache_timeout
        ))

    def test_fetch_instance_information_method_returns_expected_result_for_students_per_country(self):
        """
        Verifies that students_per_country returns data as expected in particular period and accurate datetime.
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

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.cache_instance_data')
    def test_fetch_instance_information_method_calls_cache_for_students_per_country_if_cache_timeout_is_not_none(
        self, mock_cache_instance_data
    ):
        """
        Verifies that cache_instance_data called during fetch instance information method is occurring
        with not none `cache_timeout`.
        """
        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = cache_timeout_week()

        fetch_instance_information(
            'students_per_country', 'students_per_country', activity_period, cache_timeout
        )

        mock_cache_instance_data.assert_called_once()

    def test_fetch_instance_information_method_returns_none_for_students_per_country_if_cache_timeout_is_none(self):
        """
        Verifies that students_per_country returns data as expected if no students with country.
        """
        last_login = timezone.make_aware(datetime.datetime(2017, 5, 15, 14, 23, 23), timezone.get_default_timezone())

        UserFactory.create(last_login=last_login)

        activity_period = datetime.date(2017, 5, 15), datetime.date(2017, 5, 16)
        cache_timeout = None

        result = fetch_instance_information(
            'students_per_country', 'students_per_country', activity_period, cache_timeout)

        self.assertEqual({None: 0}, result)
