import os
import json
from this import d
import time
from urllib import request
import requests
# f = open("all_data.json", "r", encoding="utf-8")
while True:
    with open("all_data.json") as file:
        data = json.load(file)

    response = requests.get('https://temperature-api-django.herokuapp.com/api/temperature_readings?ordering=-value_datetime').json()

    for temps in response:
        if not any('id' in d and d['id'] == temps['id'] for d in data):
            print(f"Adding {temps['id']} to json")
            data.append(temps)

    json_string = json.dumps(data)
    with open('all_data.json', 'w') as outfile:
        outfile.write(json_string)
    
    time.sleep(300)
