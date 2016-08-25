import json
import md5
import urllib
import urlparse
from Crypto.Cipher import AES

from django.conf import settings
from django.core.urlresolvers import reverse
from django.utils.translation import get_language
from edxmako.shortcuts import render_to_string
from shoppingcart.processors.helpers import get_processor_config
from shoppingcart.models import Order

import logging


log = logging.getLogger(__name__)

IV = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f'

def pad(data):
    length = 16 - (len(data) % 16)
    data += chr(length) * length
    return data


def encrypt(text, key):
    text = pad(text)
    digest = md5.new()
    digest.update(key)
    enc_cipher = AES.new(digest.digest(), AES.MODE_CBC, IV)
    encrypted = enc_cipher.encrypt(text).encode('hex')
    return encrypted


def decrypt(text, key):
    digest = md5.new()
    digest.update(key)
    encrypted = text.decode('hex')
    dec_cipher = AES.new(digest.digest(), AES.MODE_CBC, IV)
    decrypted = dec_cipher.decrypt(encrypted)
    return decrypted


def render_purchase_form_html(cart, callback_url=''):
    from shoppingcart.views import verify_for_closed_enrollment
    shoppingcart_items = verify_for_closed_enrollment(cart.user, cart)[-1]
    description = [('Payment for course "{}"\n'.format(course.display_name)) for item, course in shoppingcart_items]

    query = urllib.urlencode({
        'merchant_id': get_processor_config().get('merchant_id'),
        'order_id': cart.id,
        'currency': cart.currency.upper(),
        'amount': cart.total_cost,
        'redirect_url': callback_url,
        'cancel_url': 'http://{}{}'.format(settings.SITE_NAME, reverse('shoppingcart.views.show_cart')),
        'language': get_language(),
        #'items': "".join(description))
    })
    enc_request = encrypt(query, get_processor_config().get('working_key'))

    return render_to_string('shoppingcart/cybersource_form.html', {
        'action': get_processor_config().get('action'),
        'params': {
            'encRequest': enc_request,
            'access_code': get_processor_config().get('access_code'),
        }
    })


def process_postpay_callback(params):
    data = dict(urlparse.parse_qsl(decrypt(params['encResp'], get_processor_config().get('working_key'))))

    if data['order_status'] == 'Success':
        order = Order.objects.get(id=int(data['order_id']))
        log.info('Order "{}" and transaction "{}" is successed'.format(order, data['tracking_id']))
        order.purchase(
            country=data['billing_country'],
            cardtype=data['card_name'],
            first=data['billing_name'],
            city=data['billing_city'],
            state=data['billing_state'],
            postalcode=data['billing_zip'],
            street1=data['billing_address'],
            processor_reply_dump=json.dumps(data)
        )
        return {'success': True, 'order': order, 'error_html': ''}
    else:
        log.error('Order "{}" and transaction "{}" is failed'.format(order, data['tracking_id']))
        return {'success': False, 'order': order,
                'error_html': 'Transaction "{}" is filed.\nERROR:\n\t""'.format(data['tracking_id'],
                                                                                data['failure_message'])}
