from django.conf import settings
from shoppingcart.processors.helpers import get_processor_config
from edxmako.shortcuts import render_to_string
from shoppingcart.models import Order
from datetime import datetime, timedelta
import logging
import json

import base64
import hmac
import hashlib
import binascii
from collections import OrderedDict
import pytz

log = logging.getLogger(__name__)

current_tz = pytz.timezone(settings.TIME_ZONE)


def escapeVal(val):
    return val.replace('\\','\\\\').replace(':','\\:')


def signParams(params):
    signing_string = ':'.join(map(escapeVal, params.keys() + params.values()))
    hm = hmac.new(binascii.a2b_hex(get_processor_config().get('HMAC_KEY')), signing_string, hashlib.sha256)
    params['merchantSig'] =  base64.b64encode(hm.digest())
    return params


def render_purchase_form_html(cart, callback_url=''):
    current_date = current_tz.localize(datetime.now())
    sessionValidity = current_date + timedelta(minutes=15)

    params = {
        'skinCode': get_processor_config().get('SKIN_CODE'),
        'paymentAmount': str(int(cart.total_cost*100)), # amount in cents
        'merchantAccount': get_processor_config().get('MERCHANT_ACCOUNT'),
        'currencyCode': cart.currency.upper(),
        'merchantReference': 'edx_fastlane-{}'.format(cart.id),
        'shipBeforeDate': sessionValidity.isoformat(),
        'sessionValidity': sessionValidity.isoformat()
    }

    params = OrderedDict(sorted(params.items(), key=lambda t: t[0]))

    return render_to_string('shoppingcart/cybersource_form.html', {
        'action': get_processor_config().get('ACTION_URL'),
        'params': signParams(params)
    })


def process_postpay_callback(params):
    status = params['authResult']
    recieved_order = params['merchantReference'].split('-')[-1]
    order = Order.objects.get(id=int(recieved_order))
    if status == 'AUTHORISED':
        _record_purchase(params, order)
        log.info('Success payment for order {}'.format(order.id))
        return {
            'success': True,
            'order': order,
            'error_html': ''
        }
    else:
        log.info('Unsuccessfull payment for order {}'.format(order.id))
        return {
                'success': False,
                'order': order,
                'error_html': _format_error_html(u'Error: {msg}'.format(msg=params['authResult']
                                                                            )
                                                )
               }


def _format_error_html(msg):
    """ Format an HTML error message """
    return u'<p class="error_msg">{msg}</p>'.format(msg=msg)


def _record_purchase(params, order):
    """
    Record the purchase and run purchased_callbacks
    """

    order.purchase(
        cardtype=params['paymentMethod'],
        country=params['shopperLocale'],
        processor_reply_dump=params
    )
