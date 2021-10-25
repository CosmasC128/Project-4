from django.db import models

# Create your models here.
class Busrating(models.Model):
    passion = models.PositiveIntegerField(default=0)
    presence = models.PositiveIntegerField(default=0)
    presentation = models.PositiveIntegerField(default=0)
    punctuality = models.PositiveIntegerField(default=0)
    userprofile = models.ForeignKey(
        "Userprofile.Userprofile", # this defines the {app}.{modelName} that we are looking to create a relationship with
        related_name = "businessratings", # this is what the column will be called on the userprofile lookup
        on_delete = models.CASCADE # this specifies that the rating should be deleted if the userprofile is deleted
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "ratings",
        on_delete = models.CASCADE
    )

    # This is specific to a one-to-many relationship

    def __str__(self):
        return f"Rating by {self.owner} for {self.userprofile}"