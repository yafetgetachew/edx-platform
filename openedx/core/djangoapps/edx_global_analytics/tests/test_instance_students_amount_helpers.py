"""
Tests for edX global analytics application functions, that help to calculate statistics.
"""

from datetime import date

from mock import patch

from django.test import TestCase

from ..utils import (
    get_previous_day_start_and_end_dates,
    get_previous_week_start_and_end_dates,
    get_previous_month_start_and_end_dates,
)


class TestStudentsAmountPerParticularPeriodHelpFunctions(TestCase):
    """
    Tests for edX global analytics application functions, that help to calculate statistics.
    """
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.date')
    def test_get_previous_day_start_and_end_dates(self, mock_date):
        """
        Verifies that get_previous_day_start_and_end_dates returns expected previous day start and end dates.
        """
        mock_date.today.return_value = date(2017, 6, 14)

        result = get_previous_day_start_and_end_dates()

        self.assertEqual(
            (date(2017, 6, 13), date(2017, 6, 14)), result
        )

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.date')
    def test_get_previous_week_start_and_end_dates(self, mock_date):
        """
        Verifies that test_get_previous_week_start_and_end_dates returns expected previous week start and end dates.
        """
        mock_date.today.return_value = date(2017, 6, 14)

        result = get_previous_week_start_and_end_dates()

        self.assertEqual(
            (date(2017, 6, 5), date(2017, 6, 12)), result
        )

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.date')
    def test_get_previous_month_start_and_end_dates(self, mock_date):
        """
        Verifies that test_get_previous_month_start_and_end_dates returns expected previous month start and end dates.
        """
        mock_date.today.return_value = date(2017, 6, 14)

        result = get_previous_month_start_and_end_dates()

        self.assertEqual(
            (date(2017, 5, 1), date(2017, 6, 1)), result
        )
