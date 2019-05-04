from django.forms.models import model_to_dict
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.core.paginator import Paginator
import json
from django.views.decorators.csrf import csrf_exempt
from myweb.models import User
# Create your views here.
def open_login(request):
    return render(request, "login/login.html")
# 登录页面(加入：@csrf_exempt 标记,防止出现错误csrf_token错误 （403）
@csrf_exempt
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    result = 2
    user = User.objects.filter(username=username).first()
    if user is not None:
        if user.password == password:
            request.session['username'] = user.username
            result = 0
        else:
            result = 1
    return JsonResponse({"result": result})
# 退出登录
def out_login(request):
    request.session['username'] = None
    return render(request, "login/login.html")
# 后台首页面
def index(request):
    username = request.session.get('username')
    return render(request, "index.html", {"username":username})
# 后台主页面
def main(request):
    return render(request, "main.html")
# 打开用户信息列表页面
def open_users(request):
    return render(request, "userinfo/userinfoInfo.html")
# 页面查询用户信息
def query_users(request):
    key = request.GET.get("key")
    limit = request.GET.get("limit")
    page = request.GET.get("page")
    us = User.objects.all()
    paginator = Paginator(us, limit)
    p_list = paginator.page(page).object_list
    count = paginator.count
    json_list = []
    for v in p_list:
        json_dict = model_to_dict(v)
        json_list.append(json_dict)
    data_j = json.dumps(json_list)
    data_json = json.loads(data_j)
    # 将数据发给页面
    context = {"code": 0, "data": data_json, "count": count, "msg": "数据"}
    return JsonResponse(context)

#  打开添加页面
def open_add(request):
    return render(request, "userinfo/userinfoAdd.html")

#  保存数据
@csrf_exempt
def save_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    obj = User.objects.create(username=username, password=password)
    result = -1
    if obj:
        result = 0
    return JsonResponse({"result": result})

#  打开修改页面
def open_edit(request):
    id = request.GET.get('id')
    # 到数据库查询用户信息
    m = User.objects.filter(id=id).first()
    # 将数据发给页面
    context = {"m": m}
    return render(request, "userinfo/userinfoEdit.html", context)

#  更新数据
@csrf_exempt
def update_user(request):
    id = request.POST.get('id')
    username = request.POST.get('username')
    password = request.POST.get('password')
    obj = User.objects.filter(id=id).update(username=username, password=password)
    result = -1
    if obj:
        result = 0
    return JsonResponse({"result": result})

def open_update_user_password(request):
    id = request.GET.get('id')
    # 到数据库查询用户信息
    m = User.objects.filter(id=id).first()
    # 将数据发给页面
    context = {"m": m}
    return render(request, "userinfo/uppassword.html", context)

# 删除数据
def delete_user(request):
    id = request.GET.get('id')
    obj = User.objects.filter(id=id).delete()
    result = -1
    if obj:
        result = 0
    return JsonResponse({"result": result})



