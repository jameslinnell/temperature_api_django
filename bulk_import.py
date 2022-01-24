import os
import json
import requests

from common.config import Config

f = open("all_data.json", "r", encoding="utf-8")
data = json.load(f)
f.close()
for line in data:
    r = requests.post(f'{Config.REMOTE_URL}/api/temperature_readings/', json=line)
    print(f"Status Code: {r.status_code}, Response: {r.json()}")