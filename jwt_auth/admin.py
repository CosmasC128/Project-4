from django.contrib import admin
from django.contrib.auth import get_user_model
User = get_user_model() # get_user_model always returns whichever model is currently setup for authentication

# Register your models here.
admin.site.register(User)