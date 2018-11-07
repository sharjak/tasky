from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.template import loader

# Create your views here.
def taskList(request):
  return render(request,'taskList.html')

@csrf_exempt
def task(request):
  requestBody = request.POST
  print(requestBody)
  print(requestBody['task'])
  context = {
      'task': requestBody['task']
  }
  template = loader.get_template('task.html')
  return HttpResponse(template.render(context, request))