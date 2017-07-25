"""
Providers for access token`s authentication flow.
"""

import requests

from openedx.core.djangoapps.edx_global_analytics.models import AccessTokensStorage
from openedx.core.djangoapps.edx_global_analytics.utils import request_exception_handler_with_logger


def clean_unauthorized_access_token():
    """
    Delete first and sole access token in storage.

    If instance unsuccessfully authorized, statistics dispatch flow needs to registry access token again.
    """
    AccessTokensStorage.objects.first().delete()

def get_access_token():
    """
    Return single access token for authorization.

    Actually this application works only with one OLGA acceptor for now.
    So access token is needed to make relationship with `edx_global_analytics` and `OLGA`.
    Reference: https://github.com/raccoongang/acceptor
    """
    try:
        access_token = AccessTokensStorage.objects.first().access_token
    except AttributeError:
        access_token = ''

    return access_token


@request_exception_handler_with_logger
def access_token_registration(olga_acceptor_url):
    """
    Request access token from Acceptor and store it.
    """
    token_registration_request = requests.post(olga_acceptor_url + '/api/token/registration/')
    access_token = token_registration_request.json()['access_token']

    AccessTokensStorage.objects.create(access_token=access_token)

    return access_token


@request_exception_handler_with_logger
def access_token_authorization(access_token, olga_acceptor_url):
    """
    Verify that installation is allowed to send statistics to OLGA acceptor.

    Acceptor can lost edX instance token (returns 401 status code), so edX instance won't be authorized.
    Solved this problem with refreshed token.
    """
    token_authorization_request = requests.post(
        olga_acceptor_url + '/api/token/authorization/', data={'access_token': access_token, }
    )

    if token_authorization_request.status_code == 401:
        return False

    return True


def get_acceptor_api_access_token(olga_acceptor_url):
    """
    Provide access token`s authentication flow for getting access token and return it.

    If access token does not exist, method goes to register it.
    After successful registration edX platform authorizes itself via access token.

    If instance successfully authorized, method returns access token.
    If not it cleans token in storage and goes ahead to repeat flow.
    """
    access_token = get_access_token()

    if not access_token:
        access_token = access_token_registration(olga_acceptor_url)

    if access_token_authorization(access_token, olga_acceptor_url):
        return get_access_token()

    clean_unauthorized_access_token()
    return get_acceptor_api_access_token(olga_acceptor_url)
