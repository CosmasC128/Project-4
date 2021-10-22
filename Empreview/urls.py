from django.urls import path
from .views import EmpreviewListView

urlpatterns = [
    path('', EmpreviewListView.as_view()),
]