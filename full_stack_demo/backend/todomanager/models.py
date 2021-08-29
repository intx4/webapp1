from django.db import models

# Create your models here.

class ToDo(models.Model):
    title = models.CharField(max_length=30)
    description = models.CharField(max_length=200)
    urgent = models.BooleanField(default=False)
    private = models.BooleanField(default=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title