from flask import Flask, jsonify, request
import functionsNeeded
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/", methods=['POST'])
def handle_json():
    data = json.loads(request.data)
    string = data['sentence']
    print(string)
    obj = functionsNeeded.get_adjective_info(str(string), 2)
    print(obj)
    return jsonify(obj)


if __name__ == "__main__":
    app.run(host='localhost', port=8080, debug=True)
