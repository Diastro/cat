import json
import logging
import os
import datetime

from flask import Flask
from flask import request
from flask import jsonify


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
    with open('../output/activity.log', 'a') as file:
        file.write(data['url'] + '\n')
    return jsonify(message="Activity recorded"), 200


def log(data):
    if VERBOSE:
        dt = datetime.datetime.fromtimestamp(data['time'] / 1000.0)
        print str(dt) + " - " + json.dumps(data)


if __name__ == "__main__":
    print 'Server starting.'
    logDir = "../output/"
    if not os.path.exists(logDir):
        os.makedirs(logDir)
    app.run('0.0.0.0', debug=DEBUG, use_evalex=False)