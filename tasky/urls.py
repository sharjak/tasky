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
from django.conf.urls import url
from django.contrib import admin
from home import views as homeViews
from taskCalendar import views as taskCalendarViews
from taskList import views as taskListViews
from userStatistics import views as userStatisticsViews
from django.urls import path, include
from django.contrib.auth.urls import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls, name='adminsite'),
    path('accounts/', include('django.contrib.auth.urls')),
    url(r'^register/$', homeViews.UserFormView.as_view(), name='register'),
    url(r'^login/$', auth_views.login, name='login'),
    url(r'^logout/$', auth_views.logout, {'next_page': 'home'}, name='logout'),
    url(r'^auth/', include('social_django.urls', namespace='social')),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        homeViews.activate, name='activate'),
    path('', homeViews.index, name='home'),
    path('calendar/', taskCalendarViews.taskCalendar, name='calendar'),
    path('tasklist/', taskListViews.taskList, name='tasklist'),
    path('statistics/', userStatisticsViews.userStatistics, name='statistics'),
    path('tasklist/task/', taskListViews.task, name='task')
]
