from django.shortcuts import render
from rest_framework import viewsets #handy class from rest framework to create views
from .models import ToDo
from .serializers import ToDoSerializer

# Create your views here.
class ToDoView(viewsets.ModelViewSet):
    queryset = ToDo.objects.all() # the target objects of the actions
    serializer_class = ToDoSerializer # the serializer to use
