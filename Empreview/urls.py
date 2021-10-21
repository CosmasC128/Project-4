from django.urls import path
from .views import EmpreviewListView, EmpreviewDetailView

urlpatterns = [
    path('', EmpreviewListView.as_view()),
    path('<int:pk>/', EmpreviewDetailView.as_view())
]