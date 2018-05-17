import json
from django.conf import settings
from django.core.urlresolvers import reverse
from edxmako.shortcuts import render_to_string
from shoppingcart.processors.helpers import get_processor_config
from shoppingcart.models import Order

import logging

log = logging.getLogger(__name__)


def render_purchase_form_html(cart, callback_url=''):
    from shoppingcart.views import verify_for_closed_enrollment
    shoppingcart_items = verify_for_closed_enrollment(cart.user, cart)[-1]
    description = [("Payment for course '{}'\n".format(course.display_name)) for item, course in shoppingcart_items]
    return render_to_string('shoppingcart/mpesa_form.html', {
        'action': get_processor_config().get('PURCHASE_ENDPOINT'),
        'params': {
            'cmd': '_xclick',
            'charset': 'utf-8',
            'currency_code': cart.currency.upper(),
            'amount': cart.total_cost,
            'item_name': "".join(description)[0:127],
            'custom': cart.id,
            'business': get_processor_config().get('CLIENT_ID'),
            'notify_url': callback_url,
            'cancel_return': 'http://{}{}'.format(settings.SITE_NAME, reverse('shoppingcart.views.show_cart')),
            'return': 'http://{}{}'.format(settings.SITE_NAME, reverse('dashboard')),
        }
    })


def process_postpay_callback(params):
    order = Order.objects.get(id=int(params['custom']))
    if params['payment_status'] == 'Completed':
        log.info('Order "{}" and transaction "{}" is successed'.format(order, params['txn_id']))
        order.purchase(
            country=params.get('address_country'),
            first=params.get('first_name'),
            last=params.get('last_name'),
            street1=params.get('address_street'),
            city=params.get('address_city'),
            state=params.get('address_state'),
            postalcode=params.get('address_zip'),
            processor_reply_dump=json.dumps(params)
        )
        return {'success': True, 'order': order, 'error_html': ''}
    else:
        log.error('Order "{}" and transaction "{}" is failed'.format(order, params['txn_id']))
        return {'success': False, 'order': order, 'error_html': 'Transaction "{}" is filed'.format(params['txn_id'])}

def get_purchase_endpoint():
    """
    Return the URL of the payment end-point for CyberSource.

    Returns:
        unicode

    """
    return get_processor_config().get('PURCHASE_ENDPOINT', '')

def get_signed_purchase_params(cart, callback_url=None, extra_data=None):
    """
    This method will return a digitally signed set of CyberSource parameters

    Args:
        cart (Order): The order model representing items in the user's cart.

    Keyword Args:
        callback_url (unicode): The URL that CyberSource should POST to when the user
            completes a purchase.  If not provided, then CyberSource will use
            the URL provided by the administrator of the account
            (CyberSource config, not LMS config).

        extra_data (list): Additional data to include as merchant-defined data fields.

    Returns:
        dict

    """
    total_cost = cart.total_cost
    amount = "{0:0.2f}".format(total_cost)
    params = OrderedDict()
    #TODO: add all params for Mpesa API
    return params