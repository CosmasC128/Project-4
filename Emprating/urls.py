from django.urls import path
from .views import EmpratingListView, EmpratingDetailView

urlpatterns = [
    path('', EmpratingListView.as_view()),
    path('<int:pk>/', EmpratingDetailView.as_view())
]