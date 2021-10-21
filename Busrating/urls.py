from django.urls import path
from .views import BusratingListView, BusratingDetailView

urlpatterns = [
    path('', BusratingListView.as_view()),
    path('<int:pk>/', BusratingDetailView.as_view())
]