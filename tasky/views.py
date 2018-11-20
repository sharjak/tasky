from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout


def logIn(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            return HttpResponse('<p>you are already logged in</p>')
        else:
            return HttpResponse("<p>whatcha doin' here</p>")
    else:
        requestBody = request.POST
        user = authenticate(username=requestBody['username'], password=requestBody['password'])
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        else:
            return HttpResponse("<p> could not log you in </p>")


def logOut(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponseRedirect('/')
    else:
        return HttpResponse("<p>you're already logged out</p>")


def register(request):
    if request.method == 'POST':
        requestBody = request.POST
        print(requestBody)
        user = User.objects.create_user(requestBody['username'], requestBody['username'], requestBody['password'])
        print(user)
        user.active = True
        user.staff = False
        user.admin = False
        user.save()
        user = authenticate(username=requestBody['username'], password=requestBody['password'], request=request)
        print(user)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
        else:
            return HttpResponse('<h1> User was not created </h1>')
    else:
        return HttpResponse("<p> only POST </p>")
