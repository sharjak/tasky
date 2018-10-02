from django.shortcuts import render

# Create your views here.
def userStatistics(request):
  return render(request,'userStatistics.html')