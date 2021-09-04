from django.db import models

# Create your models here.

class ToDo(models.Model):
    description = models.CharField(max_length=200)
    important = models.BooleanField(default=False)
    isPrivate = models.BooleanField(default=True)
    deadline = models.DateField(auto_now_add=False)

    def __str__(self):
        return self.description