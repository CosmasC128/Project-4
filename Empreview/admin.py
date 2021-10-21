from django.contrib import admin
from .models import Empreview # Importing the model from our models file to register to admin

# I always do this immediately after creating the model so it's registered in the admin straight away
admin.site.register(Empreview)