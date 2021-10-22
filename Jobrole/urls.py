from django.urls import path

# import views
from .views import JobroleDetailView, JobroleListView

urlpatterns = [
    path('', JobroleListView.as_view()),
    path('<int:pk>/', JobroleDetailView.as_view())
]