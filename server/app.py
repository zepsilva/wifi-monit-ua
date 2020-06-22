from flask import Flask, request, jsonify
import flask_cors
from querys import *
import json
import sys
import time
from stats import *

app = Flask(__name__)
cors = flask_cors.CORS(app)
@app.route('/department', methods=['GET'])
def teste():
    return {'AP': 'salaEstudo', 'numDevices': 70}

@app.route('/numDevicesAP', methods=['GET'])
def numDevicesperAPmac():
    AP=request.args['AP']
    ap_info=getDevicesByAp(AP)
    ap_info_json={'numDevices':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json


@app.route('/infoAP', methods=['GET'])
def numDevicesperAPmacTime():
    AP=request.args['AP']
    t = time.time()
    try:
        t = float(request.args['Time'])
    except:
        pass
    numDevices = getDevicesByAp(AP,t)
    numUsers = getDevicesByAp(AP, t, True)
    ap_info_json={'numDevices':str(numDevices), 'numUsers':str(numUsers)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json


@app.route('/infoBuilding', methods=['GET'])
def numDevicesPerBuilding():
    building = request.args['Building']
    t = time.time()
    try:
        t = float(request.args['Time'])
    except:
        pass
    numDevices = getDevicesInBuilding(building, t)
    numUsers = getUsersInBuilding(building,t)
    bjson={'numDevices':str(numDevices), 'numUsers':str(numUsers)}

    bjson = json.dumps(bjson)
    return bjson

@app.route('/infoFloor', methods=['GET'])
def infoFloor():
    building = request.args['Building']
    floor = request.args['Floor']
    t = time.time()
    try:
        t = float(request.args['Time'])
    except:
        pass
    numDevices = getDevicesInFloor(building,floor, t)
    numUsers = getUsersInFloor(building,floor,t)
    bjson={'numDevices':str(numDevices), 'numUsers':str(numUsers)}
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

@app.route('/numUsersAP', methods=['GET'])
def numUsersperAPmac():
    AP=request.args['AP']
    ap_info=getDevicesByAp(AP, users = True)
    ap_info_json={'numUsers':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json

@app.route('/numUsersAPTime', methods=['GET'])
def numUsersperAPmacTime():
    AP=request.args['AP']
    time = float(request.args['Time'])
    ap_info=getDevicesByAp(AP,time, True)
    ap_info_json={'numUsers':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json


@app.route('/numUsersBuilding', methods=['GET'])
def numUsersPerBuilding():
    building = request.args['Building']
    info = getUsersInBuilding(building)
    bjson = {'numUsers':str(info)}
    bjson = json.dumps(bjson)
    return bjson

@app.route('/numUsersBuildingTime', methods=['GET'])
def numUsersPerBuildingTime():
    building = request.args['Building']
    time = float(request.args['Time'])
    info = getUsersInBuilding(building, time)
    bjson = {'numUsers':str(info)}
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


@app.route('/numDevicesLast24AP', methods=['GET'])
def numDevicesLast24Ap():
    AP=request.args['AP']
    time = time.time()
    try:
        time = float(request.args['Time'])
    except:
        pass
    ap_info=last24HoursByAp(AP, time)
    ap_info_json={'list':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json

@app.route('/numDevicesLast24Building', methods=['GET'])
def numDevicesLast24Building():
    build=request.args['Building']
    t = time.time()
    try:
        t = float(request.args['Time'])
    except:
        pass
    ap_info=last24HoursByBuilding(build, t)
    ap_info_json={'list':ap_info}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json

@app.route('/numDevicesLast7Building', methods=['GET'])
def numDevicesLast7Ap():
    build=request.args['Building']
    t = time.time()
    try:
        t = float(request.args['Time'])
    except:
        pass
    ap_info=last7DaysByBuilding(build, t)
    ap_info_json={'list':ap_info}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json

@app.route('/numDevicesLast7AP', methods=['GET'])
def numDevicesLast7Building():
    ap=request.args['AP']
    time = time.time()
    try:
        time = float(request.args['Time'])
    except:
        pass
    ap_info=last7DaysByAp(ap, time)
    ap_info_json={'list':str(ap_info)}
    ap_info_json=json.dumps(ap_info_json)
    return ap_info_json



@app.route('/APbyfloor', methods=['GET'])
def APbyfloor():
    return

@app.route("/get_client_ip", methods=['GET'])
def get_client_ip():
    return jsonify({'ip': request.remote_addr}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
