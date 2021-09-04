from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo #target Model
        fields = ('id', 'description', 'important', 'isPrivate', 'deadline') #fields to be conv. to Json