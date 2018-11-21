from django.contrib import admin

# Register your models here.
from taskList.models import Task

admin.site.register(Task)