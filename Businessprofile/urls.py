from django.urls import path
from .views import BusinessprofileListView, BusinessprofileDetailView

urlpatterns = [
    path('', BusinessprofileListView.as_view()),
    path('<int:pk>/', BusinessprofileDetailView.as_view()),
]