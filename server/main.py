import json
import logging
import os

from flask import Flask
from flask import request


app = Flask(__name__)
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

VERBOSE = True
DEBUG = False


@app.route('/', methods=['POST'])
def parse_request():
    data = request.get_json()
    log(data)
    with open('../output/activity.log', 'a') as file:
        file.write(data['url'] + '\n')
    return "Activity recorded", 200


def log(data):
    if VERBOSE:
        print json.dumps(data)


if __name__ == "__main__":
    print 'Server starting.'
    logDir = "../output/"
    if not os.path.exists(logDir):
        os.makedirs(logDir)
    app.run('0.0.0.0', debug=DEBUG, use_evalex=False)