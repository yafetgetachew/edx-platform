import requests

from django.conf import settings


def student_is_verified(user_id):
    url = getattr(settings, 'ASU_API_URL', '') + "/api/learner?openEdxId={}".format(user_id)
    headers = {
        'Content-Type': 'application/json',
        'tokentype': 'OPENEDX',
        'x-api-key': getattr(settings, 'ASU_API_KEY', '')
    }
    student_status = requests.get(url, headers=headers).json()
    eligible = student_status.get('eligibilityStatus') == 'true'
    verify_id_free = int(student_status.get('benefitType', 0)) in (1, 2)
    return eligible, verify_id_free
