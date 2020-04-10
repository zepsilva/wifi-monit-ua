from flask import Flask
from flask_restful import reqparse, abort, Api, Resource
from resources import *
import json

app = Flask(__name__)
api = Api(app)

DATA = json.load(open('resources/data.json', 'r'))

def abort_no_search_term(search_term):
    if search_term not in DATA['ClientSessions'][0]:
        abort(404, ERROR = "Cannot filter by {}.".format(search_term))

class Clients(Resource):
    def get(self):
        return DATA['Clients']

class AccessPoints(Resource):
    def get(self):
        return DATA['AccessPoints']

class ClientSessions(Resource):
    def get(self):
        return DATA['ClientSessions']

class ClientSessionsSearch(Resource):
    def get(self, search_term):
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
    app.run(debug=True)
