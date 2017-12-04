import logging
import string
import random

from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from social_django.models import UserSocialAuth

from third_party_auth.models import SAMLProviderConfig, SAMLProviderData
from openedx.core.djangoapps.user_api.accounts.api import check_account_exists
from openedx.core.lib.api.authentication import OAuth2AuthenticationAllowInactiveUser
from openedx.core.lib.api.permissions import ApiKeyHeaderPermission
from student.views import create_account_with_params


log = logging.getLogger(__name__)


class CreateUserView(APIView):
    authentication_classes = OAuth2AuthenticationAllowInactiveUser,
    permission_classes = ApiKeyHeaderPermission,

    def post(self, request):
        """
        Creates a new user account

        URL: /ospp_api/v0/create_user/
        Arguments:
            request (HttpRequest)
                HEAD
                {
                    "x-edx-api-key": "EDX-API-TOKEN"
                }
                JSON (application/json)
                {
                    "username": "user4",
                    "email": "userUdot@example.com",
                }
        Returns:
            HttpResponse: 200 on success, {"user_id": 3}
            HttpResponse: 400 if the request is not valid
            HttpResponse: 409 if an account with the given username or email address already exists
        """
        data = request.data

        data['honor_code'] = "True"
        data['terms_of_service'] = "True"

        # Handle duplicate email/username
        conflicts = check_account_exists(email=data['email'], username=data['username'])
        if conflicts:
            errors = {"user_message": "User already exists"}
            return Response(errors, status=409)
        # Generate fake password and set name equal to the username
        data['password'] = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(32))
        name = data['name'].split(' ', 1)

        # Avoid sending activation email
        data['send_activation_email'] = False
        try:
            user = create_account_with_params(request, data)
            user.is_active = True
            idp = SAMLProviderConfig.objects.first().backend_name
            social_user_id = '{}:{}'.format(idp, data.pop('name_id'))
            UserSocialAuth.objects.create(user=user, provider=idp, uid=social_user_id)
            user.first_name = name[0]
            user.last_name = name[1]
            user.save()
        except ValidationError:
            errors = {"user_message": "Wrong parameters on user creation"}
            return Response(errors, status=400)
        except AttributeError:
            errors = {"user_message": "Wrong Identity Provider's configuration"}
            return Response(errors, status=400)

        return Response({'user_id': user.id}, status=200)
