import os

class Config(object):
    LOCAL_URL = os.environ.get('LOCAL_URL', 'http://127.0.0.1:8000')
    REMOTE_URL = os.environ.get('REMOTE_URL', '')