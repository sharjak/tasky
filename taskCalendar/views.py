from django.shortcuts import render

# Create your views here.
def taskCalendar(request):
  return render(request,'taskCalendar.html')