from flask import Flask, jsonify, request
import functionsNeeded
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
     obj = functionsNeeded.get_adjective_info(string, 2)

    # return json
     return jsonify(obj)
