from django.contrib import admin

from .models import TemperatureReading

class TemperatureReadingAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': [
            'id', 'value', 'value_datetime', 
            'mean', 'median', 'mode', 'std_deviation', 
            'variance', 'percentile25', 'percentile50', 'percentile75'
            ]}),
    ]
    list_display = ('value_datetime', 'value')
    list_filter = ['value_datetime']
    search_fields = ['value']

admin.site.register(TemperatureReading, TemperatureReadingAdmin)