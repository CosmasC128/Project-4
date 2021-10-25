from django.db import models

# Create your models here.
class Jobpost(models.Model):
    # title = string
    # location = string
    # employees_applied: [] #how to implment username POST method to track all applied
    title = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    text = models.TextField(max_length=3000) # TextField used because it uses a textarea in the admin instead of a text input, type of VARCHA
    available = models.BooleanField(default=False)
    jobrole = models.ForeignKey(
      "Jobrole.Jobrole", # this defines the {app}.{modelName} that we are looking to create a relationship with
      related_name = "jobposts", # this is what the column will be called on the business lookup *** changed this while trying to fix Jobrole attribute error from serializer
      on_delete = models.CASCADE # this specifies that the jobpost should be deleted if the jobrole is deleted
    )
    business = models.ForeignKey(
      "Businessprofile.Businessprofile", # this defines the {app}.{modelName} that we are looking to create a relationship with
      related_name = "jobposts", # this is what the column will be called on the business lookup
      on_delete = models.CASCADE # this specifies that the business should be deleted if the product is deleted
    )
    Userprofiles = models.ManyToManyField(
      'Userprofile.Userprofile', # Build many to many relationship through the Genre model in the genres app
      related_name = "jobposts",
      blank=True
    )
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name = "jobpost",
      on_delete = models.CASCADE
    )

    # This is specific to a one-to-many relationship

    def __str__(self):
        return f"{self.title} by {self.business}"