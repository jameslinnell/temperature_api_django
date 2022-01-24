from .models import TemperatureReading
from .serializers import TemperatureReadingSerializer, BulkTemperatureReadingSerializer
from rest_framework import viewsets, filters, mixins
from rest_framework.response import Response

class TemperatureReadingRestView(viewsets.ModelViewSet, mixins.ListModelMixin):
    serializer_class = TemperatureReadingSerializer
    queryset = TemperatureReading.objects.all()
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['value_datetime']
    ordering = ['value_datetime']

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, dict):
            return super(TemperatureReadingRestView, self).create(request, *args, **kwargs)
        elif isinstance(request.data, list):
            serializer = BulkTemperatureReadingSerializer(data={'temperature_readings': request.data})
            if serializer.is_valid():
                serializer.create(request.data)
                return Response(serializer.data, status=201)
            else:
                return Response(serializer.errors, status=400)
        else:
            return Response('Invalid data received', status=400)

