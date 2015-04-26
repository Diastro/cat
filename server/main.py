import json
import logging
import datetime

from elasticsearch import Elasticsearch
from flask import Flask
from flask import request
from flask import jsonify


es = Elasticsearch()
app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

VERBOSE = True
DEBUG = False


@app.route('/heartbeat', methods=['GET'])
def heartbeat():
    return "Alive", 200


@app.route('/', methods=['POST'])
def parse_request():
    data = request.get_json()
    log(data)
    es.index(index="cat", doc_type='activity', id=data['activityId'], body=data)
    return jsonify(message="Activity recorded"), 200


def log(data):
    if VERBOSE:
        dt = datetime.datetime.fromtimestamp(data['timestamp'] / 1000.0)
        print str(dt) + " - " + json.dumps(data)


if __name__ == "__main__":
    print 'Server starting.'
    app.run('0.0.0.0', debug=DEBUG, use_evalex=False)