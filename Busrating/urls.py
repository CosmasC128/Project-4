from django.urls import path
from .views import BusratingListView

urlpatterns = [
    path('', BusratingListView.as_view()),
]