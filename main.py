from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return jsonify("This works.")

@app.route("/new")
def new():
    return jsonify("new page.")
