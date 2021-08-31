from django.contrib import admin

from .models import ToDo

# Register your models here

class ToDoAdmin(admin.ModelAdmin):
    #list_display is a default field which will contain the fields of the model to display in the admin panel
    list_display = ('title', 'description', 'urgent', 'date')

admin.site.register(ToDo, ToDoAdmin)

'''
Also alternative definition:

@admin.register(ToDo)
class ToDoAdmin(...):
    ...
'''