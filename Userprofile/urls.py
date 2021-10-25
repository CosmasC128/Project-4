from django.urls import path
from .views import UserprofileListView, UserprofileDetailView

# The last step
# Here we import in our views (like controllers) and we attach them to a path
# in the case below, we want the request to be to /Userprofiles only so we specified an empty string
# if you wanted the route to be /Userprofiles/edit you could specify 'edit/' for example
# the .as_view() method shows us a documentation style page if we access from the browser

urlpatterns = [
    path('', UserprofileListView.as_view()), # /Userprofiles/
    path('<int:pk>/', UserprofileDetailView.as_view()), # /Userprofiles/:pk/
]