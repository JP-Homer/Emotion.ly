import requests
import json

response = requests.get("https://api.dictionaryapi.dev/api/v2/entries/en/hello")
print (response.json())