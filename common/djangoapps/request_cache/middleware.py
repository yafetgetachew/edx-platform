import re
import threading

from django import http


class _RequestCache(threading.local):
    """
    A thread-local for storing the per-request cache.
    """
    def __init__(self):
        super(_RequestCache, self).__init__()
        self.data = {}
        self.request = None


REQUEST_CACHE = _RequestCache()


class RequestCache(object):
    R = re.compile('\s*(?P<key>[^=;]+)\s*(?!\\\)=\s*(?P<value>[^;]+)\s*;?')

    @classmethod
    def get_request_cache(cls, name=None):
        """
        This method is deprecated. Please use :func:`request_cache.get_cache`.
        """
        if name is None:
            return REQUEST_CACHE
        else:
            return REQUEST_CACHE.data.setdefault(name, {})

    @classmethod
    def get_current_request(cls):
        """
        This method is deprecated. Please use :func:`request_cache.get_request`.
        """
        return REQUEST_CACHE.request

    @classmethod
    def clear_request_cache(cls):
        """
        Empty the request cache.
        """
        REQUEST_CACHE.data = {}
        REQUEST_CACHE.request = None

    def process_request(self, request):
        raw_cookies = request.environ.get('HTTP_COOKIE', '')
        cookies = {}
        result = self.R.finditer(raw_cookies)
        for res in result:
            res = res.groupdict()
            if res:
                cookies[res['key']] = res['value']

        request.COOKIES = http.parse_cookie(cookies)

        self.clear_request_cache()
        REQUEST_CACHE.request = request
        return None

    def process_response(self, request, response):
        self.clear_request_cache()
        return response
