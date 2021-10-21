from django.urls import path

# import views
from .views import JobroleListView

urlpatterns = [
    path('', JobroleListView.as_view())
]