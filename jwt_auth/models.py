from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email = models.CharField(max_length=50, unique=True)
    profile_image = models.CharField(max_length=300)
    first_name = models.CharField(max_length=50, default=None)
    last_name = models.CharField(max_length=50, default=None)
    cv = models.TextField(max_length=5000, default=None)
    coverLetter = models.TextField(max_length=5000, default=None)
    title = models.CharField(max_length=50, default=None)
    description = models.TextField(max_length=5000, default=None)

