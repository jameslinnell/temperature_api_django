import datetime
import uuid
import numpy
from scipy import stats

from django.contrib import admin
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils import timezone

class TemperatureReading(models.Model):
    value = models.FloatField()
    value_datetime = models.DateTimeField(default=timezone.now)
    id = models.UUIDField(unique=True, auto_created=True, default=uuid.uuid4, primary_key=True)
    mean = models.FloatField(null=True, blank=True)
    median = models.FloatField(null=True, blank=True)
    mode = models.FloatField(null=True, blank=True)
    std_deviation = models.FloatField(null=True, blank=True)
    variance = models.FloatField(null=True, blank=True)
    percentile25 = models.FloatField(null=True, blank=True)
    percentile50 = models.FloatField(null=True, blank=True)
    percentile75 = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.id}"

    @admin.display(
        boolean=True,
        ordering='value_datetime',
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.value_datetime <= now

def machine_learning_pre_save_receiver(sender, instance, *args, **kwargs):
    temperatures = TemperatureReading.objects.all()
    all_values = []
    all_values.append(instance.value)
    if temperatures:
        for temps in temperatures:
            all_values.append(temps.value)
        
    instance.mean = numpy.mean(all_values)
    instance.median = numpy.median(all_values)
    instance.mode = stats.mode(all_values)[0]
    instance.std_deviation = numpy.std(all_values)
    instance.variance = numpy.var(all_values)
    instance.percentile25 = numpy.percentile(all_values, 25)
    instance.percentile50 = numpy.percentile(all_values, 50)
    instance.percentile75 = numpy.percentile(all_values, 75)

pre_save.connect(machine_learning_pre_save_receiver, sender=TemperatureReading)