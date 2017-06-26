"""
Tests acceptor API usage by edx_global_analytics application functions aka utils.
"""

import unittest
import logging

import requests
from mock import patch, Mock

logger = logging.getLogger(__name__)


class TestAcceptorApiUsageHelpFunctions(unittest.TestCase):
    """
    Tests for OLGA acceptor api usage by edX global analytics application.
    """
    @patch('openedx.core.djangoapps.edx_global_analytics.utils.request_exception_handler_with_logger')
    def test_request_exception_handler_with_logger_returns_wrapped_function_without_raise_exception(
            self, mock_request_exception_handler_with_logger
    ):
        """
        Test request_exception_handler_with_logger return wrapped function, if Request Exception does not exist.
        """
        def mock_function_under_decorator(mock):
            return mock

        mock_request_exception_handler_with_logger.return_value = mock_function_under_decorator('mock')

        result = mock_request_exception_handler_with_logger()

        self.assertEqual(mock_function_under_decorator('mock'), result)

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
