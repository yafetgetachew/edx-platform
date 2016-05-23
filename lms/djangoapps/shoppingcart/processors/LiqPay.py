# -*- coding: utf-8 -*-
import json
from edxmako.shortcuts import render_to_string
from shoppingcart.processors.helpers import get_processor_config
from shoppingcart.models import Order
from django.conf import settings
from liqpay.liqpay import LiqPay
import logging

log = logging.getLogger(__name__)

public_key = get_processor_config().get('public_key')
private_key = get_processor_config().get('private_key')
is_sandbox = get_processor_config().get('sandbox', '')
callback_url = 'http://{}/shoppingcart/liqpay'.format(settings.SITE_NAME)


def get_description(shoppingcart_items):
    description = u'Payment for:\n'
    for item, course in shoppingcart_items:
        if int(item.qty) > 1:
            description += (u'course "{course}" - '
                           u'{cost} {currency} * {qty} students '
                           u'- {line_cost} {currency}\n').format(
                               course=course.display_name,
                               currency=item.currency.upper(),
                               cost=item.unit_cost,
                               qty=item.qty,
                               line_cost=item.line_cost
                               )
        else:
            description += (u'course "{course}", '
                           u'cost {line_cost} {currency}\n').format(
                               course=course.display_name,
                               currency=item.currency.upper(),
                               line_cost=item.line_cost
                               )
    return description


def render_purchase_form_html(cart, **kwargs):
    from shoppingcart.views import verify_for_closed_enrollment
    shoppingcart_items = verify_for_closed_enrollment(cart.user, cart)[-1]
    if shoppingcart_items:
        liqpay = LiqPay(public_key, private_key)
        html = liqpay.cnb_form({
            "version": "3",
            "action": "pay",
            "amount": str(cart.total_cost),
            "currency": cart.currency.upper(),
            "description": get_description(shoppingcart_items),
            "order_id": str(cart.id),
            "sandbox": is_sandbox,
            "server_url": callback_url,
            "result_url": callback_url
            })
        return html
    else:
        return render_to_string('shoppingcart/cybersource_form.html',{
                                   'action': '',
                                   'params': {}
                               })


def process_postpay_callback(user, order):
    liqpay = LiqPay(public_key, private_key)
    result = liqpay.api("payment/status", {
        'version': '3',
        'order_id': order.id
        })
    status = result['status']
    if (is_sandbox and status == 'sandbox') or (status == 'success'):
        if is_sandbox:
            log.info('Payments in "sandbox" mode, money will not be transferred')
        _record_purchase(result, order)
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
                'error_html': _format_error_html(u'The specific error code is: {code} <br>'
                                                 u'Message is: {msg}'.format(
                                                                             code=result.get('err_code'), 
                                                                             msg=result.get('err_description')
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
        country=params.get('sender_card_country'),
        cardtype=params.get('paytype'),
        processor_reply_dump=json.dumps(params)
    )
