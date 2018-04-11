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
from openedx.core.djangoapps.site_configuration.helpers import get_value

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
        is_enable_sso = get_value('ENABLE_SSO', False)
        is_has_attr = (
            request.GET.has_key("access_id") and
            request.GET.has_key("username") and
            request.GET.has_key("signature") and
            request.GET.has_key("timestamp")
        )
        is_need_login_another_user = is_enable_sso and is_has_attr and request.user.is_authenticated()
        is_need_login = (not request.user.is_authenticated()) and is_enable_sso

        if is_need_login_another_user or is_need_login:
            status = self._check_sso_and_register_user(request, is_need_login_another_user)

            if 'course_id' in view_kwargs:
                if not status:
                    return HttpResponseForbidden()
                try:
                    create_course_enrollment(
                        request.user.username,
                        view_kwargs['course_id'],
                        mode='honor',
                        is_active=True
                    )
                except Exception:
                    pass

    def _check_sso_and_register_user(self, request, is_need_logout=False):
        access_id = request.GET.get('access_id', None)
        username = request.GET.get('username', None)
        signature = request.GET.get('signature', None)
        timestamp_request = request.GET.get('timestamp', None)

        if is_need_logout:
            logout(request)

        if self._check_signature(access_id,  username, signature, timestamp_request):
            user = self._get_user_with_request_and_username(request, username)
            login(request, user)
            return True
        else:
            return False

    def _check_signature(self, access_id,  username,  signature,  timestamp_request):
        if access_id and username and signature and timestamp_request:
            try:
                timestamp = datetime.utcfromtimestamp(float(str(timestamp_request)))
            except ValueError:
                return False
            else:
                if timestamp < datetime.utcnow() - timedelta(seconds=int(settings.FEATURES['LOGIN_TIMEOUT'])):
                    return False

            thing_to_hash = '{}:{}:{}'.format(access_id, timestamp_request, username)
            dig = hmac.new(str(settings.CAMARA_SECRET), msg=thing_to_hash, digestmod=hashlib.sha256).hexdigest()
            verification_signature = base64.b64encode(dig).decode()

            if verification_signature != signature.replace(' ', '+'):
                return False

            return True
        else:
            return False

    def _get_user_with_request_and_username(self, request, username):
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

        user.backend = 'fake_backend'
        return user
