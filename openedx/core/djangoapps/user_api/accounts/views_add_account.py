from django.core.exceptions import ValidationError

from rest_framework.response import Response
from rest_framework import status

from enrollment.views import ApiKeyPermissionMixIn
from openedx.core.lib.api.permissions import ApiKeyHeaderPermission
from student.views import _do_create_account, AccountValidationError
from student.forms import AccountCreationForm
from .views import AccountView


class AccountAddView(AccountView, ApiKeyPermissionMixIn):
    permission_classes = (ApiKeyHeaderPermission, )

    def post(self, request):
        form = AccountCreationForm(
            data=request.data,
            extra_fields={},
            extended_profile_fields={},
            enforce_username_neq_password=False,
            enforce_password_policy=False,
            tos_required=False,
        )

        try:
            (user, profile, registration) = _do_create_account(form)
        except ValidationError as err:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data=err
            )
        except AccountValidationError as err:
            data_err = {}
            data_err[err.field] = [err.message]
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data=data_err
            )
        user.is_active = True
        user.save()

        return Response(
            status=status.HTTP_200_OK,
            data={"message": u"Account successfully created."}
        )
