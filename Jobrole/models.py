from django.db import models

# Create your models here.
class Jobrole(models.Model):
    jobrole = models.CharField(max_length=50)
    
    def __str__(self):
        return f"{self.jobrole}"