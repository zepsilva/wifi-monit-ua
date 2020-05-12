from flask import Flask, request
import flask_cors
from querys import *
import json
import sys

app = Flask(__name__)
cors = flask_cors.CORS(app)
@app.route('/department', methods=['GET'])
def teste():
    return {'AP': 'salaEstudo', 'numDevices': 70}

@app.route('/numDevicesAP', methods=['GET'])
def numDevicesperAPmac():
    AP=request.args['AP']
    ap_info=getInfoByAp(AP)
    ap_info_json={'numDevices':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json

@app.route('/numDevicesAPTime', methods=['GET'])
def numDevicesperAPmacTime():
    AP=request.args['AP']
    time = float(request.args['Time'])
    ap_info=getInfoByAp(AP,time)
    ap_info_json={'numDevices':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json



@app.route('/APbyfloor', methods=['GET'])
def APbyfloor():
    return


if __name__ == '__main__':
    app.run(host='0.0.0.0')
