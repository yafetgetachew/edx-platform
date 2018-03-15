"""
Middleware for the courseware app
"""

from django.shortcuts import redirect

from lms.djangoapps.courseware.exceptions import Redirect
from django.conf import settings
from django.contrib.auth import login, logout

from enrollment.data import create_course_enrollment
from student.views import create_account_with_params
from third_party_auth.pipeline import make_random_password
from django.http import HttpResponseForbidden
from datetime import datetime, timedelta
from django.contrib.auth.models import AnonymousUser, User
import base64
import hmac
import hashlib
from openedx.core.djangoapps.site_configuration.helpers import get_value, get_current_site_configuration


class RedirectMiddleware(object):
    """
    Catch Redirect exceptions and redirect the user to the expected URL.
    """
    def process_exception(self, _request, exception):
        """
        Catch Redirect exceptions and redirect the user to the expected URL.
        """
        if isinstance(exception, Redirect):
            return redirect(exception.url)



class SsoMiddleware(object):

    def process_view(self, request, view_func, view_args, view_kwargs):
        is_enable_sso = False
        if get_current_site_configuration():
            is_enable_sso = get_value('ENABLE_SSO', False)
        elif 'LOGIN_TIMEOUT' in settings.FEATURES:
            is_enable_sso = settings.FEATURES['ENABLE_SSO']

        if not request.user.is_authenticated() and is_enable_sso:
            return self.__check_sso(request, view_args, view_kwargs)


    def __check_sso(self, request, *arg, **kwargs):

        access_id = request.GET.get('access_id')
        username = request.GET.get('username')
        signature = request.GET.get('signature')
        timestamp_request = request.GET.get('timestamp')

        if not (access_id and username and signature and timestamp_request):
            return HttpResponseForbidden()

        try:
            timestamp = datetime.utcfromtimestamp(float(str(timestamp_request)))
        except ValueError:
            return HttpResponseForbidden()
        else:
            if timestamp < datetime.utcnow() - timedelta(seconds=int(settings.FEATURES['LOGIN_TIMEOUT'])):
                logout(request)
                return HttpResponseForbidden()

        thing_to_hash = '{}:{}:{}'.format(access_id, timestamp_request, username)
        dig = hmac.new(str(settings.CAMARA_SECRET), msg=thing_to_hash, digestmod=hashlib.sha256).digest()
        verification_signature = base64.b64encode(dig).decode()

        if verification_signature != signature.replace(' ', '+'):
            return HttpResponseForbidden()

        country = request.GET.get('locale', 'en')
        http_host = request.META['HTTP_HOST']
        http_host = http_host.split(':')
        email = request.GET.get('email', '{0}@{1}'.format(
            ''.join(e for e in username if e.isalnum()), http_host[0]
        ))

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:

            user_data = {
                'email': email,
                'country': country,
                'username': username,
                'name': username,
                'terms_of_service': "True",
                'honor_code': 'True',
                'password': make_random_password()
            }
            create_account_with_params(request, user_data)
            user = request.user
            user.is_active = True
            user.save()
        if 'course_id' in kwargs:
            try:
                create_course_enrollment(
                    user.username,
                    kwargs['course_id'],
                    mode='honor',
                    is_active=True
                )
            except Exception:
                pass
        user.backend = 'fake_backend'
        login(request, user)
