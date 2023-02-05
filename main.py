from flask import Flask, jsonify, request
from flask_cors import CORS
from functionsNeeded import get_adjective_info
import json

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
# Parses information and returns json file to front end
def handle_json():
    data = json.loads(request.data) # Receives json given by frontend
    string = data['sentence'] # Grabs the sentence from the json
    obj = get_adjective_info(str(string), 2) # Runs backend algorithm on string

    if obj:
        return jsonify(obj) # returns a json file with information required by front end

    # Returns 400 code if json file is empty (no adjectives with emotional connotation in sentence)
    return "No adjective that denotes emotion was found. Please try another sentence", 400


if __name__ == "__main__":
    app.run(host='localhost', port=8080, debug=True)
