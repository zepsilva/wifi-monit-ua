from flask import Flask, request, jsonify
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


@app.route('/numDevicesBuilding', methods=['GET'])
def numDevicesPerBuilding():
    building = request.args['Building']
    info = getDevicesInBuilding(building)
    bjson = {'numDevices':str(info)}
    bjson = json.dumps(bjson)
    return bjson

@app.route('/numDevicesBuildingTime', methods=['GET'])
def numDevicesPerBuildingTime():
    building = request.args['Building']
    time = float(request.args['Time'])
    info = getDevicesInBuilding(building, time)
    bjson = {'numDevices':str(info)}
    bjson = json.dumps(bjson)
    return bjson

@app.route('/numDevicesBlock', methods=['GET'])
def numDevicesPerBlock():
    building = request.args['Building']
    block = request.args['Block']
    info = getDevicesInBuilding(block, building)
    bjson = {'numDevices':str(info)}
    bjson = json.dumps(bjson)
    return bjson

@app.route('/numDevicesBlockTime', methods=['GET'])
def numDevicesPerBlockTime():
    building = request.args['Building']
    block = request.args['Block']
    time = float(request.args['Time'])
    info = getDevicesInBuilding(block, building, time)
    bjson = {'numDevices':str(info)}
    bjson = json.dumps(bjson)
    return bjson


@app.route('/APbyfloor', methods=['GET'])
def APbyfloor():
    return

@app.route("/get_client_ip", methods=['GET'])
def get_client_ip():
    return jsonify({'ip': request.remote_addr}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
