"""
Tests for OLGA acceptor api usage by edX global analytics application tasks and helper functions.
"""

import logging
import uuid
import unittest

import requests
from mock import patch

from ..utils import (
    get_access_token,
    get_dispatch_installation_statistics_access_token
)

logger = logging.getLogger(__name__)


class TestAcceptorApiUsageHelpFunctions(unittest.TestCase):
    """
    Tests for OLGA acceptor api usage by edX global analytics application tasks and helper functions.
    """

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.request_exception_handler_with_logger')
    def test_request_exception_handler_with_logger_returns_wrapped_function_without_raise_exception(
            self, mock_request_exception_handler_with_logger
    ):
        """
        Test request_exception_handler_with_logger return wrapped function, if Request Exception does not exist.
        """
        def mock_decorated_function(mock):
            """
            Mock decorated function.
            """
            return mock

        mock_request_exception_handler_with_logger.return_value = mock_decorated_function('mock')

        result = mock_request_exception_handler_with_logger()

        self.assertEqual(mock_decorated_function('mock'), result)

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.logging.Logger.exception')
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.request_exception_handler_with_logger')
    def test_request_exception_handler_with_logger_method_logs_error_message_after_raise_exception(
            self, mock_request_exception_handler_with_logger, mock_logging_exception
    ):
        """
        Test request_exception_handler_with_logger raise Request Exception
        if whatever happened with request inside wrapped function.
        """
        mock_request_exception_handler_with_logger.return_value.side_effect = requests.RequestException()
        mock_logging_exception.exception.assert_called_once()

    @patch('openedx.core.djangoapps.edx_global_analytics.models.AccessTokensStorage.objects.first')
    def test_get_access_token_method_gets_access_token_from_database_if_it_exists(
            self, mock_access_tokens_storage_model_objects_first_method
    ):
        """
        Verify that get_access_token gets access token from access tokens storage if it exists.
        """
        mock_access_token = uuid.uuid4().hex

        class MockAccessTokensStorageModelFirstObject(object):
            """
            Mock class for AccessTokensStorage model first object.
            """
            access_token = mock_access_token

        mock_access_tokens_storage_model_objects_first_method.return_value = MockAccessTokensStorageModelFirstObject()

        result = get_access_token()

        self.assertEqual(mock_access_token, result)

    @patch('openedx.core.djangoapps.edx_global_analytics.models.AccessTokensStorage.objects.first')
    def test_get_access_token_method_returns_empty_line_if_access_token_does_not_exist(
            self, mock_access_tokens_storage_model_objects_first_method
    ):
        """
        Verify that get_access_token gets empty string if access token does not exist in access tokens storage.

        It is accompanied by AttributeError.
        """
        mock_access_tokens_storage_model_objects_first_method.side_effect = AttributeError()
        result = get_access_token()

        self.assertEqual('', result)

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.access_token_registration')
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def get_dispatch_installation_statistics_access_token_method_goes_to_access_token_registration_if_it_does_not_exist(
            self, mock_get_access_token, mock_access_token_registration
    ):
        """
        Verify that dispatch_installation_statistics_access_token goes to registry access token if it does not exist.
        """
        mock_get_access_token.return_value = ''

        get_dispatch_installation_statistics_access_token('https://mock-url.com')

        mock_access_token_registration.assert_called_once_with('https://mock-url.com')

    @patch('openedx.core.djangoapps.edx_global_analytics.utils.access_token_authorization')
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.get_access_token')
    def get_dispatch_installation_statistics_access_token_method_goes_to_access_token_authorization_if_it_exists(
            self, mock_get_access_token, mock_access_token_authorization
    ):
        """
        Verify that dispatch_installation_statistics_access_token goes to authorize access token if it exists.
        """
        mock_get_access_token.return_value = uuid.uuid4().hex

        get_dispatch_installation_statistics_access_token('https://mock-url.com')

        mock_access_token_authorization.assert_called_once_with('https://mock-url.com')
