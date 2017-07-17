"""
Tests for edx global analytics application tasks and helper functions.
"""

import unittest

import requests
from mock import patch

from openedx.core.djangoapps.edx_global_analytics.utils import (
    get_coordinates_by_platform_city_name,
    get_coordinates_by_ip,
    platform_coordinates,
)


@patch('openedx.core.djangoapps.edx_global_analytics.utils.requests.get')
class TestPlatformCoordinates(unittest.TestCase):
    """
    Tests for platform coordinates methods, that gather latitude and longitude.
    """

    def test_get_coordinates_by_platform_city_name_method_sends_request_to_google_api(
            self, mock_request
    ):
        """
        Verify that get_coordinates_by_platform_city_name sends request to Google API with address as parameter.
        """
        get_coordinates_by_platform_city_name('Kiev')
        mock_request.assert_called_once_with(
            'https://maps.googleapis.com/maps/api/geocode/json', params={'address': 'Kiev'}
        )

    def test_get_coordinates_by_platform_city_name_method_gets_address_coordinates(self, mock_request):
        """
        Verify that get_coordinates_by_platform_city_name returns city latitude and longitude as expected.
        """
        mock_request.return_value.json.return_value = {
            'results': [{
                'geometry': {
                    'location': {
                        'lat': 50.4501,
                        'lng': 30.5234
                    }
                }
            }]
        }

        latitude, longitude = get_coordinates_by_platform_city_name('Kiev')
        self.assertEqual(
            (50.4501, 30.5234), (latitude, longitude)
        )

    def test_get_coordinates_result_by_platform_city_name_method_returns_none_if_no_city_name(
            self, mock_request
    ):
        """
        Verify that get_coordinates_by_platform_city_name returns city latitude and longitude
        although city name in settings is empty.
        """
        mock_request.return_value.json.return_value = {
            'results': []
        }

        result_without_city_name = get_coordinates_by_platform_city_name('')
        self.assertEqual(None, result_without_city_name)

    def test_get_coordinates_result_by_platform_city_name_returns_none_if_wrong_city_name(
            self, mock_request
    ):
        """
        Verify that get_coordinates_by_platform_city_name returns None if platform city name in settings is wrong.
        """
        mock_request.return_value.json.return_value = {
            'results': []
        }

        result_without_city_name = get_coordinates_by_platform_city_name('Lmnasasfabqwrqrn')
        self.assertEqual(None, result_without_city_name)

    def test_get_coordinates_by_ip_method_sends_request_to_freegeoip_api(self, mock_request):
        """
        Verify that get_coordinates_by_ip sends request to FreeGeoIP API.
        """
        get_coordinates_by_ip()
        mock_request.assert_called_once('https://freegeoip.net/json')

    def test_get_coordinates_by_ip_method_returns_coordinates_from_freegeoip_api(self, mock_request):
        """
        Verify that get_coordinates_by_ip returns city latitude and longitude as expected.
        """
        mock_request.return_value.json.return_value = {
            'latitude': 50.4333,
            'longitude': 30.5167
        }

        latitude, longitude = get_coordinates_by_ip()
        self.assertEqual(
            (50.4333, 30.5167), (latitude, longitude)
        )

    def test_get_coordinates_by_ip_method_returns_empty_coordinates_if_exception(self, mock_request):
        """
        Verify that get_coordinates_by_ip returns empty latitude and longitude after request exception.
        """
        mock_request.side_effect = requests.RequestException()
        latitude, longitude = get_coordinates_by_ip()
        self.assertEqual(
            ('', ''), (latitude, longitude)
        )


@patch('openedx.core.djangoapps.edx_global_analytics.utils.get_coordinates_by_platform_city_name')
class TestPlatformCoordinatesHandler(unittest.TestCase):
    """
    Tests for platform_coordinates method, that handle platform coordinates receiving from independent APIs.
    """

    def test_platform_coordinates_method_handles_flow_to_google_api(
            self, mock_get_coordinates_by_platform_city_name
    ):
        """
        Verify that platform_coordinates returns platform coordinates from Google API.
        """
        latitude, longitude = 50.4333, 30.5167

        mock_get_coordinates_by_platform_city_name.return_value = 50.4333, 30.5167

        result = platform_coordinates('Kiev')

        self.assertEqual(
            (latitude, longitude), result
        )

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_coordinates_by_ip')
    def test_platform_coordinates_method_handles_flow_to_freeheoip(
            self, mock_get_coordinates_by_ip, mock_get_coordinates_by_platform_city_name
    ):
        """
        Verify that platform_coordinates returns platform coordinates from FreeGeoIP API
        if Google API does not return it.
        """
        latitude, longitude = 50.4333, 30.5167

        mock_get_coordinates_by_platform_city_name.return_value = None
        mock_get_coordinates_by_ip.return_value = latitude, longitude

        result = platform_coordinates('Kiev')

        self.assertEqual(
            (latitude, longitude), result
        )
