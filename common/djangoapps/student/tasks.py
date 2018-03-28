"""
This file contains celery tasks for sending email
"""
import logging
import StringIO
from datetime import timedelta
from django.conf import settings
from django.core import mail
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext as _

from celery.task import task, periodic_task  # pylint: disable=no-name-in-module, import-error
from celery.schedules import crontab
from celery.exceptions import MaxRetriesExceededError
from boto.exception import NoAuthHandlerFound
from .admin import write_users_report

log = logging.getLogger('edx.celery.task')

User = get_user_model()  # pylint:disable=invalid-name


@task(bind=True)
def send_activation_email(self, subject, message, from_address, dest_addr):
    """
    Sending an activation email to the users.
    """
    max_retries = settings.RETRY_ACTIVATION_EMAIL_MAX_ATTEMPTS
    retries = self.request.retries
    try:
        mail.send_mail(subject, message, from_address, [dest_addr], fail_silently=False)
        # Log that the Activation Email has been sent to user without an exception
        log.info("Activation Email has been sent to User {user_email}".format(
            user_email=dest_addr
        ))
    except NoAuthHandlerFound:  # pylint: disable=broad-except
        log.info('Retrying sending email to user {dest_addr}, attempt # {attempt} of {max_attempts}'. format(
            dest_addr=dest_addr,
            attempt=retries,
            max_attempts=max_retries
        ))
        try:
            self.retry(countdown=settings.RETRY_ACTIVATION_EMAIL_TIMEOUT, max_retries=max_retries)
        except MaxRetriesExceededError:
            log.error(
                'Unable to send activation email to user from "%s" to "%s"',
                from_address,
                dest_addr,
                exc_info=True
            )
    except Exception:  # pylint: disable=bare-except
        log.exception(
            'Unable to send activation email to user from "%s" to "%s"',
            from_address,
            dest_addr,
            exc_info=True
        )
        raise Exception


@periodic_task(ignore_result=True, run_every=timedelta(minutes=settings.FEATURES.get('REPORT_INTERVAL', 2880)))
def send_users_report():
    qs = User.objects.all()
    fd = StringIO.StringIO()
    write_users_report(qs, fd, overwrite=True)
    email = mail.EmailMessage(
        _('Users report'),
        _('Users report in attachment...'),
        settings.DEFAULT_FROM_EMAIL,
        settings.FEATURES.get('USER_REPORT_EMAILS', [settings.CONTACT_EMAIL])
    )
    email.attach('users_report.csv', fd.getvalue(), 'text/csv')
    email.send(fail_silently=False)
