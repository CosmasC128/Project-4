from django.db import models

# Create your models here.

# Creating a model is always the step I do first
# Inheriting the Model class from django, we're able to specify each fields attributes

class Businessprofile(models.Model):
    # Each field is blank=False by default, which is the same as required
    title = models.CharField(max_length=50, default=None) # default=None is necessary if we are adding the field after we already have data in our table, it means that it won't throw a missing field error, because None is still a value
    location = models.CharField(max_length=300, default=None)
    description = models.TextField(max_length=3000, default=None)
    image = models.ImageField(upload_to='images', blank=True)
    
    Userprofiles = models.ManyToManyField(
        'Userprofile.Userprofile', # Build many to many relationship through the Genre model in the genres app
        related_name = "businessprofiles",
        blank=True
    )

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name = 'businessprofile',
        on_delete = models.CASCADE
    )

    # __str__ function is predefined and part of Model class we inherited
    # Just returns a title string for when we create records in the admin system
    def __str__(self):
        return f"{self.title} {self.location}"