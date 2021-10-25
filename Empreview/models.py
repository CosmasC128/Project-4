from django.db import models

# Create your models here.
class Empreview(models.Model):
    pay = models.PositiveIntegerField(default=0)
    patience = models.PositiveIntegerField(default=0)
    positivity = models.PositiveIntegerField(default=0)
    punishment = models.PositiveIntegerField(default=0)

    businessprofile = models.ForeignKey(
        "Businessprofile.Businessprofile", # this defines the {app}.{modelName} that we are looking to create a relationship with
        related_name = "employeereviews", # this is what the column will be called on the businessprofile lookup
        on_delete = models.CASCADE # this specifies that the review should be deleted if the businessprofile is deleted
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name = "reviews",
        on_delete = models.CASCADE
    )

    # This is specific to a one-to-many relationship

    def __str__(self):
        return f"Rating by {self.owner} for {self.businessprofile}"