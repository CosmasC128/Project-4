from django.db import models

# Create your models here.
class Jobpost(models.Model):
    # title = string
    # location = string
    # employees_applied: [] #how to implment username POST method to track all applied

    text = models.TextField(max_length=3000) # TextField used because it uses a textarea in the admin instead of a text input, type of VARCHAR
    jobpost = models.ForeignKey(
      "Businessprofile.Businessprofile", # this defines the {app}.{modelName} that we are looking to create a relationship with
      related_name = "jobpost", # this is what the column will be called on the jobpost lookup
      on_delete = models.CASCADE # this specifies that the jobpost should be deleted if the product is deleted
    )
    owner = models.ForeignKey(
      "jwt_auth.User",
      related_name = "jobposts",
      on_delete = models.CASCADE
    )

    # This is specific to a one-to-many relationship

    def __str__(self):
        return f"{self.product}"