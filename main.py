from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def handle_json():
    return "works" # string from front end
    # do something with string
    # return json
