
class CsrfViewMiddlewareDeleteSessionIDCSFToken():
    """
    if request header get attr csrf_delete_cookie is True than delete csrftoken and sessionid
    """
    def process_response(self, request, response):
        if request.META.get("csrf_delete_cookie"):
            response.delete_cookie('csrftoken')
            response.delete_cookie('sessionid')

        return response
