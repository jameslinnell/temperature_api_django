from rest_framework import serializers
from .models import TemperatureReading

class TemperatureReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemperatureReading
        fields = ('id', 'value', 'value_datetime', 'mean', 'median', 'mode', 'std_deviation', 'variance', 'percentile25', 'percentile50', 'percentile75')

class BulkTemperatureReadingSerializer(serializers.Serializer):
    temperature_readings = TemperatureReadingSerializer(many=True)

    class Meta:
        fields = ['temperature_readings']
    
    def create(self, validated_data):
        create_objects_list = []

        for data in validated_data:
            create_objects_list.append(TemperatureReading(**{**data}))
        
        return TemperatureReading.objects.bulk_create(create_objects_list)
