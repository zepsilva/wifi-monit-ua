#!/usr/bin/env python3

from flask import Flask
from flask_restful import abort, Api, Resource
from resources import *
from datetime import datetime, time, timedelta
import json
import random
import string

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
                users = random.randint(0, 15)
                accessPoint['numUsers'] = users
                accessPoint['clientCount'] = int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)
        else: 
            for accessPoint in DATA['AccessPoints']:
                temp = accessPoint['clientCount']
                users = random.randint(0, 1)
                accessPoint['numUsers'] += users
                accessPoint['clientCount'] += int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(12, 0, 0, 0) and time_now < time(13, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 2:
                continue
            else:
                temp = accessPoint['clientCount']
                users = random.randint(0, 2)
                accessPoint['numUsers'] -= users
                accessPoint['clientCount'] -= int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(13, 0, 0, 0) and time_now < time(14, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 2:
                continue
            else:
                temp = accessPoint['clientCount']
                users = random.randint(0, 2)
                accessPoint['numUsers'] -= users
                accessPoint['clientCount'] -= int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(14, 0, 0, 0) and time_now < time(15, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            users = random.randint(0, 2)
            accessPoint['numUsers'] += users
            accessPoint['clientCount'] += int(users * 1.8)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(15, 0, 0, 0) and time_now < time(18, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            users = random.randint(0, 2)
            accessPoint['numUsers'] += users
            accessPoint['clientCount'] += int(users * 1.8)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(18, 0, 0, 0) and time_now < time(20, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 5:
                continue
            else:
                temp = accessPoint['clientCount']
                users = random.randint(0, 3)
                accessPoint['numUsers'] -= users
                accessPoint['clientCount'] -= int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(20, 0, 0, 0) and time_now < time(22, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 1:
                continue
            else:
                temp = accessPoint['clientCount']
                users = random.randint(0, 1)
                accessPoint['numUsers'] -= users
                accessPoint['clientCount'] -= int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time(22, 0, 0, 0) and time_now < time.max:
        for accessPoint in DATA['AccessPoints']:
            temp = accessPoint['clientCount']
            users = random.randint(0, 1)
            accessPoint['numUsers'] += users
            accessPoint['clientCount'] += int(users * 1.8)
            update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    if time_now >= time.min and time_now < time(9, 0, 0, 0):
        for accessPoint in DATA['AccessPoints']:
            if accessPoint['clientCount'] < 1:
                continue
            else:
                temp = accessPoint['clientCount']
                users = random.randint(0, 4)
                accessPoint['numUsers'] -= users
                accessPoint['clientCount'] -= int(users * 1.8)
                update_clients(self, accessPoint['macAddress'], accessPoint['clientCount'] - temp)

    with open('resources/data.json', 'w') as write_file:
        json.dump(DATA, write_file)

def update_clients(self, apMacAddress, numClientsCreateOrRemove):

    device_type = ["laptop", "phone", "other"]

    if numClientsCreateOrRemove == 0:
        return

    elif numClientsCreateOrRemove > 0:
        for c in range(0, numClientsCreateOrRemove):

            letters = string.ascii_lowercase
            userName = ''.join(random.choice(letters) for i in range(8))

            if c < int(numClientsCreateOrRemove / 2):
                DATA["Clients"].append({"apMacAddress": apMacAddress, "connectionType": "LIGHTWEIGHTWIRELESS", "deviceType": "phone"})
                DATA["Clients"].append({"apMacAddress": apMacAddress, "connectionType": "LIGHTWEIGHTWIRELESS", "deviceType": device_type[random.randint(1, 2)]})
                macAddDevice = "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                                random.randint(0, 255),
                                random.randint(0, 255))
                DATA["ClientSessions"].append({"apMacAddress": apMacAddress, "macAddress": macAddDevice, "protocol": "UNDEFINED", "userName": userName})
                macAddDevice2 = "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                                random.randint(0, 255),
                                random.randint(0, 255))
                DATA["ClientSessions"].append({"apMacAddress": apMacAddress, "macAddress": macAddDevice2, "protocol": "UNDEFINED", "userName": userName})
        
        userName = ''.join(random.choice(letters) for i in range(8))

        if numClientsCreateOrRemove % 2 != 0:
            DATA["Clients"].append({"apMacAddress": apMacAddress, "connectionType": "LIGHTWEIGHTWIRELESS", "deviceType": device_type[random.randint(0, 1)]})
            macAddDevice = "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                                random.randint(0, 255),
                                random.randint(0, 255))
            DATA["ClientSessions"].append({"apMacAddress": apMacAddress, "macAddress": macAddDevice, "protocol": "UNDEFINED", "userName": userName})

    else:

        removed = 0

        for i in range(0, len(DATA['Clients'])):
            if DATA['Clients'][i + removed]['apMacAddress'] == apMacAddress and removed > numClientsCreateOrRemove:
                DATA['Clients'].pop(i + removed)
                removed -= 1

        removed = 0

        for i in range(0, len(DATA['ClientSessions'])):
            if DATA['ClientSessions'][i + removed]['apMacAddress'] == apMacAddress and removed > numClientsCreateOrRemove:
                userNamesToRemove = DATA['ClientSessions'][i + removed]['userName']
                DATA['ClientSessions'].pop(i + removed)
                removed -= 1
                for j in range(0, len(DATA['ClientSessions'])):
                    if DATA['ClientSessions'][j + removed]['userName'] == userNamesToRemove and removed > numClientsCreateOrRemove:
                        DATA['ClientSessions'].pop(i + removed)
                        removed -= 1
                        break;


# creating API methods
def abort_no_search_term(search_term):
    if search_term not in DATA['ClientSessions'][0]:
        abort(404, ERROR = "Cannot filter by {}.".format(search_term))

class Clients(Resource):
    def get(self):
        time = datetime.now()
        global last_call

        if last_call <= time - timedelta(minutes=9):
            last_call = time
            number_clients_ap_generator(self, time.time())

        return DATA['Clients']

class AccessPoints(Resource):
    def get(self):
        time = datetime.now()
        global last_call
        
        if last_call <= time - timedelta(minutes=9):
            last_call = time
            number_clients_ap_generator(self, time.time())

        return DATA['AccessPoints']

class ClientSessions(Resource):
    def get(self):
        time = datetime.now()
        global last_call
        
        if last_call <= time - timedelta(minutes=9):
            last_call = time
            number_clients_ap_generator(self, time.time())

        return DATA['ClientSessions']

class ClientSessionsSearch(Resource):
    def get(self, search_term):
        time = datetime.now()
        global last_call
        lista = []
        
        if last_call <= time - timedelta(minutes=9):
            last_call = time
            number_clients_ap_generator(self, time.time())
        
        term_value = search_term.split('=')
        abort_no_search_term(term_value[0])
        
        data = DATA['ClientSessions']

        for dic in data:
            if dic[term_value[0]] == term_value[1]:
                lista.append(dic)

        if lista != []:
            return lista

        abort(404, ERROR = "Cannot find value {} in 'ClientSessions'.".format(term_value[1]))

api.add_resource(Clients, '/webacs/api/v1/data/Clients')
api.add_resource(AccessPoints, '/webacs/api/v1/data/AccessPoints')
api.add_resource(ClientSessions, '/webacs/api/v1/data/ClientSessions')
api.add_resource(ClientSessionsSearch, '/webacs/api/v1/data/ClientSessions/<search_term>')


if __name__ == '__main__':
    app.run() 
