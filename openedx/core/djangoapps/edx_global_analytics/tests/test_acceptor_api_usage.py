"""
Tests acceptor API usage by edx global analytics application functions aka utils.
"""

import uuid
import unittest

from mock import patch

from openedx.core.djangoapps.edx_global_analytics.utils import send_instance_statistics_to_acceptor
from openedx.core.djangoapps.edx_global_analytics.access_token_authentication_utils import (
    access_token_authorization,
    access_token_registration,
    get_acceptor_api_access_token,
)


@patch('openedx.core.djangoapps.edx_global_analytics.utils.requests.post')
class TestAcceptorApiUsage(unittest.TestCase):
    """
    Test acceptor API usage by edx global analytics application functions aka utils.
    """

    def test_access_token_registration_method_registry_access_token(self, mock_request):
        """
        Verify that access_token_registration sends request to acceptor API for token registration.
        """
        access_token_registration('https://mock-url.com')

        mock_request.assert_called_once_with('https://mock-url.com' + '/api/token/registration/')

    @patch('openedx.core.djangoapps.edx_global_analytics.models.AccessTokensStorage.objects.create')
    def test_access_token_registration_method_save_access_token(
            self, mock_access_tokens_storage_model_objects_create_method, mock_request
    ):
        """
        Verify that access_token_registration gets access token after registration request to acceptor and
        save it to AccessTokensStorage model in database.
        """
        mock_access_token = uuid.uuid4().hex

        mock_request.return_value.json.return_value = {
            'access_token': mock_access_token
        }

        access_token_registration('https://mock-url.com')

        mock_access_tokens_storage_model_objects_create_method.assert_called_with(access_token=mock_access_token)

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def test_access_token_authorization_method_authorize_access_token(
            self, mock_get_access_token_function, mock_request
    ):
        """
        Verify that access_token_authorization sends request to acceptor API for token authorization.
        """
        mock_access_token = uuid.uuid4().hex

        mock_get_access_token_function.return_value = mock_access_token

        access_token_authorization('https://mock-url.com')

        mock_request.assert_called_once_with(
            'https://mock-url.com' + '/api/token/authorization/', data={'access_token': mock_access_token, }
        )

    @patch('openedx.core.djangoapps.edx_global_analytics.models.AccessTokensStorage.objects.first')
    def test_access_token_authorization_method_refresh_access_token(
            self, mock_access_tokens_storage_model_objects_first, mock_request
    ):
        """
        Verify that access_token_authorization method gets refreshed access token after authorization request to
        acceptor if Acceptor for any reason does not has a token from edX installation in own database.
        """
        mock_refreshed_access_token = uuid.uuid4().hex

        mock_request.status_code = 401

        mock_request.return_value.json.return_value = {
            'refreshed_access_token': mock_refreshed_access_token
        }

        access_token_authorization('https://mock-url.com')

        mock_access_tokens_storage_model_objects_first.access_token = mock_refreshed_access_token

        self.assertEqual(mock_refreshed_access_token, mock_access_tokens_storage_model_objects_first.access_token)
        mock_access_tokens_storage_model_objects_first.save.assert_called_once()

    def test_send_instance_statistics_to_acceptor_method_sends_request_to_acceptor_api(
            self, mock_request
    ):
        """
        Verify that send_instance_statistics_to_acceptor sends request to acceptor API for token dispatch statistics.
        """
        send_instance_statistics_to_acceptor('https://mock-url.com', {'mock_data': 'mock_data', })

        mock_request.assert_called_once_with(
            'https://mock-url.com' + '/api/installation/statistics/', {'mock_data': 'mock_data', }
        )

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.logging.Logger.info')
    def test_send_instance_statistics_to_acceptor_method_successfully_dispatches_statistics(
            self, mock_logging, mock_request
    ):
        """
        Verify that send_instance_statistics_to_acceptor successfully dispatches
        installation_statistics to acceptor API.
        """
        mock_request.return_value.status_code = 201

        send_instance_statistics_to_acceptor('https://mock-url.com', {'mock_data': 'mock_data', })

        mock_logging.assert_called_with('Data were successfully transferred to OLGA acceptor. Status code is 201.')

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.logging.Logger.info')
    def test_send_instance_statistics_to_acceptor_method_unsuccessfully_dispatches_statistics(
            self, mock_logging, mock_request
    ):
        """
        Verify that send_instance_statistics_to_acceptor unsuccessfully dispatches
        installation_statistics to acceptor API.
        """
        mock_request.return_value.status_code = 400

        send_instance_statistics_to_acceptor('https://mock-url.com', {'mock_data': 'mock_data', })

        mock_logging.assert_called_with(
            'Data were not successfully transferred to OLGA acceptor. Status code is {0}.'.format(
                mock_request.return_value.status_code
            )
        )


class TestDispatchInstallationStatisticsAccessToken(unittest.TestCase):
    """
    Tests for dispatching installation statistics access token.
    """

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def test_get_acceptor_api_access_token_method_calls_get_access_token(
            self, mock_get_access_token
    ):
        """
        Verify that get_acceptor_api_access_token method calls get_access_token method.
        """
        mock_get_access_token.assert_called_once()

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.access_token_registration')
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def test_get_get_acceptor_api_access_token_method_calls_access_token_registration(
            self, mock_get_access_token, mock_access_token_registration
    ):
        """
        Verify that get_acceptor_api_access_token method calls access_token_registration
        if access token does not exists.
        """
        mock_get_access_token.return_value = ''

        get_acceptor_api_access_token('https://mock-url.com')

        mock_access_token_registration.assert_called_once_with('https://mock-url.com')

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.access_token_authorization')
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def test_get_get_acceptor_api_access_token_method_calls_access_token_authorization(
            self, mock_get_access_token, mock_access_token_authorization
    ):
        """
        Verify that get_acceptor_api_access_token_method calls access_token_authorization
        if access token exists.
        """
        mock_get_access_token.return_value = uuid.uuid4().hex

        get_acceptor_api_access_token('https://mock-url.com')

        mock_access_token_authorization.assert_called_once_with('https://mock-url.com')

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def test_get_get_acceptor_api_access_token_returns_get_access_token_result(
            self, mock_get_access_token
    ):
        """
        Verify that get_acceptor_api_access_token method return get_access_token method result.
        """
        mock_access_token = uuid.uuid4().hex

        mock_get_access_token.return_value = mock_access_token

        result = get_acceptor_api_access_token('https://mock-url.com')

        self.assertEqual(mock_access_token, result)
