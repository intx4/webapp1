from django.contrib import admin

from .models import ToDo

# Register your models here

class TodoAdmin(admin.ModelAdmin):
    #list_display is a default field which will contain the fields of the model to display in the admin panel
    list_display = ('title', 'description', 'urgent')

admin.site.register(ToDo, TodoAdmin)
