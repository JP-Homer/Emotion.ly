from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def handle_json():
    string = request # string from front end
    # do something with string
    # return json
