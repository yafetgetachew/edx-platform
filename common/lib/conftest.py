from django.conf import settings
import sys


def pytest_configure():
    """
    Use Django's default settings for tests in common/lib.
    """
    reload(sys)  
    sys.setdefaultencoding('Cp1252')
    settings.configure()