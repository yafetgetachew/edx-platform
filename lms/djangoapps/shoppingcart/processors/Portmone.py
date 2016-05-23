# -*- coding: utf-8 -*-
import json
from django.core.urlresolvers import reverse
from django.conf import settings
from edxmako.shortcuts import render_to_string
from shoppingcart.processors.helpers import get_processor_config
from shoppingcart.models import Order
from microsite_configuration import microsite
from django.utils.translation import ugettext as _
import logging
import requests
from datetime import datetime
import xml.etree.ElementTree as ET

log = logging.getLogger(__name__)


def render_purchase_form_html(cart, callback_url=''):
    from shoppingcart.views import verify_for_closed_enrollment
    shoppingcart_items = verify_for_closed_enrollment(cart.user, cart)[-1]
    description = [('Payment for course {}\n'.format(course.display_name)) for item, course in shoppingcart_items]
    return render_to_string('shoppingcart/cybersource_form.html', {
        'action': get_processor_config().get('action'),
        'params': {
            'payee_id': get_processor_config().get('payee_id'),
            'shop_order_number': cart.id,
            'bill_amount': cart.total_cost,
            'description': "".join(description),
            'success_url': callback_url,
            'failure_url': callback_url,
            'lang': 'en',
        }
        })


def parse_xml_response(content):
    root = ET.fromstring(content)
    request = {}
    order = {}
    
    for item in root[0]:
        request[item.tag] = item.text
    for orders in root[1]:
        for el in orders:
            order[el.tag] = el.text
    params = {'order': order, 'request': request}
    return params


def get_response(shop_order_number):
    params = {
           'payee_id': get_processor_config().get('payee_id'),
           'shop_order_number': shop_order_number,
           'login': get_processor_config().get('login'),
           'password': get_processor_config().get('password'),
           'method': 'result',
           'start_date': datetime.today().strftime('%d.%m.%Y'),
           'end_date': datetime.today().strftime('%d.%m.%Y')
        }
    response = requests.post(get_processor_config().get('action'), data=params)
    return response.content
    

def process_postpay_callback(params):
    payment_support_email = microsite.get_value('payment_support_email', settings.PAYMENT_SUPPORT_EMAIL)

    if params.get('RESULT') == u'0':
        shop_order_number = params.get('SHOPORDERNUMBER')
        content = get_response(shop_order_number)
        order = Order.objects.get(id=int(shop_order_number))
        new_params = parse_xml_response(content)
        status = new_params['order'].get('status')
        if status and status == 'PAYED':

            _record_purchase(params, order)
            return {
                'success': True,
                'order': order,
                'error_html': ''
            }
        else:
            
            return {
                'success': False,
                'order': order,
                'error_html': _format_error_html(u'The specific error code is: {code} <br>'
                                                 u'Message is: {msg}'.format(
                                                 code=new_params['order']['error_code'], 
                                                 msg=new_params['order']['error_message']
                                                 )
                              )
            }
    else:
        error_html = _format_error_html(
            _(
                u"Sorry! Our payment processor sent us back a payment confirmation that had inconsistent data! <br>"
                u"We apologize that we cannot verify whether the charge went through and take further action on your order. <br>"
                u"The specific error message is: {msg} <br>"
                u"Your credit card may possibly have been charged. Contact us with payment-specific questions at {email}."
            ).format(
                msg=u'<span class="exception_msg">{msg}</span>'.format(msg=params.get('RESULT')),
                email=payment_support_email
            )
        )
        return {
            'success': False,
            'order': None,
            'error_html': error_html
        }


def _record_purchase(params, order):
    """
    Record the purchase and run purchased_callbacks
    """
    
    order.purchase(
        country=u'Ukraine',
        processor_reply_dump=json.dumps(params)
    )


def _format_error_html(msg):
    """ Format an HTML error message """
    return u'<p class="error_msg">{msg}</p>'.format(msg=msg)   
