"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include #import include
from todomanager import views #import views
from rest_framework import routers #import routers

#register a new url for a backend endpoint
router = routers.DefaultRouter()
router.register(r'todos',  views.ToDoView, 'ToDos') # register a todos endpoint which will provide the ToDoView

urlpatterns = [
    path('admin/', admin.site.urls), #default
    path('api/', include(router.urls)) #include into the api endpoint the urls registered in the router. I.e todos will be reacheable by api/todos. /api is the root view of the default router.
]
