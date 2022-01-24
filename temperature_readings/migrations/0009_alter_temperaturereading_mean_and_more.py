# Generated by Django 4.0.1 on 2022-01-20 21:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('temperature_readings', '0008_temperaturereading_percentile25_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='temperaturereading',
            name='mean',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='median',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='mode',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='percentile25',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='percentile50',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='percentile75',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='std_deviation',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='temperaturereading',
            name='variance',
            field=models.FloatField(auto_created=True, blank=True, editable=False, null=True),
        ),
    ]