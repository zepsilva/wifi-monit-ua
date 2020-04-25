from flask import Flask, request
from querys import *

from server.querys import getInfoByAp

app = Flask(__name__)


@app.route('/department', methods=['GET'])
def teste():
    return {'AP': 'salaEstudo', 'numDevices': 70}

@app.route('/numDevicesAP', methods=['GET'])
def numDevicesperAPmac():
    AP=request.args['AP']
    return getInfoByAp(AP)
    return {'numDevices': 123}

@app.route('/numDevicesAPTime', methods=['GET'])
def numDevicesperAPmac():
    AP=request.args['AP']
    time = request.args['Time']
    return getInfoByAp(AP, time)
    return {'numDevices': 123}

@app.route('/APbyfloor', methods=['GET'])
def APbyfloor():
    return


if __name__ == '__main__':
    app.run()
