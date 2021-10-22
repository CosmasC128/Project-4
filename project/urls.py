"""project URL Configuration

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
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('/', include('jwt_auth.urls')),
    path('/jobs/', include('Jobpost.urls')), # jobs.urls is referring to the urls.py file in the products dir
    path('/business-profile/', include('Businessprofile.urls')),
    path('/user-profile/', include('Userprofile.urls')),
    path('/emprating/', include('Empreview.urls')),
    path('/busrating/', include('Busrating.urls')),
    path('/jobrole/', include('Jobrole.urls'))
] #put api in front with no slash if our frontend is put together