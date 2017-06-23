"""
Provides factories for Access Tokens Storage models.
"""

from factory.django import DjangoModelFactory

from ..models import AccessTokensStorage

# Factories are self documenting
# pylint: disable=missing-docstring


class AccessTokensStorageFactory(DjangoModelFactory):
    class Meta(object):
        model = AccessTokensStorage

    access_token = ''
