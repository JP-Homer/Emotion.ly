from flask import Flask, jsonify, request
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/",methods=['POST'])
def handle_json(): # string from front end
     data = request.json
     string = data.get('sentence')
     print(string)

    # do something with string
    # return json
