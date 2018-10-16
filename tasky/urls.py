"""tasky URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.contrib import admin
from home import views as homeViews
from taskCalendar import views as taskCalendarViews
from taskList import views as taskListViews
from userStatistics import views as userStatisticsViews
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls, name='adminsite'),
    path('', homeViews.index, name='home'),
    path('calendar/', taskCalendarViews.taskCalendar, name='calendar'),
    path('tasklist/', taskListViews.taskList, name='tasklist'),
    path('statistics/', userStatisticsViews.userStatistics, name='statistics')
]
