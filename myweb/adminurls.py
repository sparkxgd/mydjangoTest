from django.urls import path
from myweb import views

urlpatterns = [
    path('', views.index),
    path('openLogin', views.open_login),
    path('login', views.login),
    path('outLogin', views.out_login),
    path('main', views.main),
    path('openUsers', views.open_users),
    path('queryUsers', views.query_users),
    path('openUserAdd', views.open_add),
    path('saveUser', views.save_user),
    path('openEdit', views.open_edit),
    path('updateUser', views.update_user),
    path('openUpdateUserPassword',views.open_update_user_password),
    path('deleteUser', views.delete_user),
]
