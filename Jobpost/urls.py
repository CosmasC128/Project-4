from django.urls import path
from .views import JobpostListView, JobpostDetailView

# The last step
# Here we import in our views (like controllers) and we attach them to a path
# in the case below, we want the request to be to /Jobposts only so we specified an empty string
# if you wanted the route to be /Jobposts/edit you could specify 'edit/' for example
# the .as_view() method shows us a documentation style page if we access from the browser

urlpatterns = [
    path('', JobpostListView.as_view()), # /jobs/
    path('<int:pk>/', JobpostDetailView.as_view()), # /jobs/
]