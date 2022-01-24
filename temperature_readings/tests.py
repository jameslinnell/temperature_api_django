import numpy

from django.test import TestCase
from temperature_readings.models import TemperatureReading

class TemperatureReadingTestCase(TestCase):
    def setUp(self):
        TemperatureReading.objects.create(value=22.5)
        TemperatureReading.objects.create(value=18.7)
        TemperatureReading.objects.create(value=19.3)
        TemperatureReading.objects.create(value=20.9)

    def test_correct_mean_value(self):
        all_readings = TemperatureReading.objects.all()
        for idx, reading in enumerate(all_readings):
            if idx == 0:
                self.assertEqual(round(reading.mean, 2), round(reading.value, 2))
            elif idx == 1:
                self.assertEqual(round(reading.mean, 2), round(numpy.mean([22.5, 18.7]), 2))
            elif idx == 2:
                self.assertEqual(round(reading.mean, 2), round(numpy.mean([22.5, 18.7, 19.3]), 2))
            else:
                self.assertEqual(round(reading.mean, 2), round(numpy.mean([22.5, 18.7, 19.3, 20.9]), 2))
