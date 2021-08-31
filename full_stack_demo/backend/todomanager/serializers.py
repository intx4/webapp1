from rest_framework import serializers
from .models import ToDo

class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo #target Model
        fields = ('id', 'title', 'description', 'urgent', 'is_private','date') #fields to be conv. to Json