from django.http import HttpResponse

def index(request):
    return HttpResponse("This is the holding page for the temperature api.")
