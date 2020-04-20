#!/usr/bin/env python3

# How to run server
# nohup /home/oneadmin/wifi-monit-ua/CiscoPrimeSubstitute/CPS.py &

# HTTP GET COMMANDS
# curl http://127.0.0.1:5000/webacs/api/v1/data/AccessPoints
# curl http://127.0.0.1:5000/webacs/api/v1/data/Clients
# curl http://127.0.0.1:5000/webacs/api/v1/data/ClientSessions
# curl http://127.0.0.1:5000/webacs/api/v1/data/ClientSessions/<search_term>

# How to stop server
# pkill -f CPS.py


from flask import Flask
from flask_restful import abort, Api, Resource
from resources import *
from datetime import datetime, time, timedelta
import json
import random

app = Flask(__name__)
api = Api(app)
last_call = datetime.min

with open('resources/data.json', 'r') as read_file:
    DATA = json.load(read_file)


# Trying to generate random information with time notion
def number_clients_ap_generator(self, time_now):

    if time_now >= time(9, 0, 0, 0) and time_now < time(12, 0, 0, 0):
        if DATA['AccessPoints'][0]['clientCount'] <= 1 and DATA['AccessPoints'][1]['clientCount'] <= 1 and DATA['AccessPoints'][2]['clientCount'] <= 1 and DATA['AccessPoints'][3]['clientCount'] <= 1:
            for accessPoint in DATA['AccessPoints']:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] = random.randint(0, 15)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)
        else: 
            for accessPoint in DATA['AccessPoints']:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] += random.randint(0, 2)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(12, 0, 0, 0) and time_now < time(13, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 3:
                continue
            else:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] -= random.randint(0, 3)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(13, 0, 0, 0) and time_now < time(14, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 4:
                continue
            else:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] -= random.randint(0, 4)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(14, 0, 0, 0) and time_now < time(15, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            accessPoint['clientCount'] += random.randint(0, 3)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(15, 0, 0, 0) and time_now < time(18, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            accessPoint['clientCount'] += random.randint(0, 2)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(18, 0, 0, 0) and time_now < time(20, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 5:
                continue
            else:
            	temp = accessPoint['clientCount']
            	accessPoint['clientCount'] -= random.randint(0, 5)
            	update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(20, 0, 0, 0) and time_now < time(22, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 1:
                continue
            else:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] -= random.randint(0, 1)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(22, 0, 0, 0) and time_now < time.max:
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            accessPoint['clientCount'] += random.randint(0, 1)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time.min and time_now < time(9, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 1:
                continue
            else:
                temp = accessPoint['clientCount']
                accessPoint['clientCount'] -= random.randint(0, 1)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    with open('resources/data.json', 'w') as write_file:
        json.dump(DATA, write_file)

def update_clients(self, apMacAddress, numClientsCreateOrRemove):

    if numClientsCreateOrRemove == 0:
        return

    elif numClientsCreateOrRemove > 0:
        for c in range(0, numClientsCreateOrRemove):
            DATA["Clients"].append({"apMacAddress": apMacAddress, "connectionType": "LIGHTWEIGHTWIRELESS", "deviceType": "phone"})
            macAddDevice = "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                            random.randint(0, 255),
                            random.randint(0, 255))
            DATA["ClientSessions"].append({"apMacAddress": apMacAddress, "macAddress": macAddDevice, "protocol": "UNDEFINED", "userName": "admin"})

    else:

        removed = 0

        for i in range(0, len(DATA['Clients'])):
            if DATA['Clients'][i + removed]['apMacAddress'] == apMacAddress and removed > numClientsCreateOrRemove:
                DATA['Clients'].pop(i + removed)
                removed -= 1

        removed = 0

        for i in range(0, len(DATA['ClientSessions'])):
            if DATA['ClientSessions'][i + removed]['apMacAddress'] == apMacAddress and removed > numClientsCreateOrRemove:
                DATA['ClientSessions'].pop(i + removed)
                removed -= 1


# creating API methods
def abort_no_search_term(search_term):
    if search_term not in DATA['ClientSessions'][0]:
        abort(404, ERROR = "Cannot filter by {}.".format(search_term))

class Clients(Resource):
    def get(self):
        #time = datetime.now()
        #global last_call

        #if last_call <= time - timedelta(minutes=15):
        #    last_call = time
        #    number_clients_ap_generator(self, time.time())

        return DATA['Clients']

class AccessPoints(Resource):
    def get(self):
        #time = datetime.now()
        #global last_call
        
        #if last_call <= time - timedelta(minutes=15):
        #    last_call = time
        #    number_clients_ap_generator(self, time.time())

        return DATA['AccessPoints']

class ClientSessions(Resource):
    def get(self):
        #time = datetime.now()
        #global last_call
        
        #if last_call <= time - timedelta(minutes=15):
        #    last_call = time
        #    number_clients_ap_generator(self, time.time())

        return DATA['ClientSessions']

class ClientSessionsSearch(Resource):
    def get(self, search_term):
        #time = datetime.now()
        #global last_call
        
        #if last_call <= time - timedelta(minutes=15):
        #    last_call = time
        #    number_clients_ap_generator(self, time.time())
        
        term_value = search_term.split('=')
        abort_no_search_term(term_value[0])
        
        data = DATA['ClientSessions']

        for dic in data:
            if dic[term_value[0]] is term_value[1]:
                return dic

        abort(404, ERROR = "Cannot find value {} in 'ClientSessions'.".format(term_value[1]))

api.add_resource(Clients, '/webacs/api/v1/data/Clients')
api.add_resource(AccessPoints, '/webacs/api/v1/data/AccessPoints')
api.add_resource(ClientSessions, '/webacs/api/v1/data/ClientSessions')
api.add_resource(ClientSessionsSearch, '/webacs/api/v1/data/ClientSessions/<search_term>')


if __name__ == '__main__':
    app.run() 
