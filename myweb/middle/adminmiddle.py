from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect

class Aminmiddle(MiddlewareMixin):
    def process_request(self, request):
        print("访问路径为", request.path)
        if request.path == '/myweb/login' or request.path == '/myweb/openLogin':
            return None
        else:
            v = request.session.get('username')
            if v:
                return None
            else:
                return redirect("/myweb/openLogin")


