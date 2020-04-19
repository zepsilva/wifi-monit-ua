import requests
import random
import sys
import MySQLdb

class Building:

    def __init__(self, id):
        self.id = id
        self.blocks = []

    def update(self):
        bl = []
        resp = requests.get("http://websig.ua.pt/arcgis/rest/services/" + self.id + "?f=pjson")
        for service in resp.json()['services']:
            if service['name'] not in bl and service['type'] == "FeatureServer":
                bl.append(service['name'])
        for b in bl:
            i = b.index("/")
            b = b[i+1:]
            block = Block(b, self)
            self.blocks.append(block)
        for block in self.blocks:
            block.update()

class Block:
    def __init__(self, name, build):
        self.name = name
        self.build = build
        self.ed = build.id + "/" + name
        self.floors = []

    def update(self):
        #print("http://services.web.ua.pt/arcgis/arcgis?op=pisos&ed="+self.ed)
        resp = requests.get("http://services.web.ua.pt/arcgis/arcgis?op=pisos&ed="+self.ed)
        #print(resp.json())
        for piso in resp.json()['pisos']:
            num = -1
            try:
                num = int(piso['Nome'][-1])
            except:
                pass

            floor = Floor(piso['Nome'], piso['ID'], self, num)
            self.floors.append(floor)
        for floor in self.floors:
            floor.update_comunicationsID()
            if(floor.comunicationsID != -1):
                floor.update_aps()

class Floor:

    def __init__(self, name, id, block, number=-1):
        self.name = name
        self.id = id
        self.number = number
        self.block = block
        self.comunicationsID = -1
        self.aps = []

    def update_comunicationsID(self):
        resp = requests.get("http://services.web.ua.pt/arcgis/arcgis?op=infraestruturas&ed=" + self.block.ed + "&p=" + str(self.id))
        for inf in resp.json()['infraestruturas'][self.name]:
            if inf['Nome'] is not None and "Comunica" in inf['Nome'] :
                self.comunicationsID = inf['ID']

    def update_aps(self):
        resp = requests.get("http://services.web.ua.pt/arcgis/arcgis?op=elementos&ed=" + self.block.ed + "&p=" + str(self.id) + "&i=" + str(self.comunicationsID))
        x = resp.json()["elementos"][self.name]
        y = x[list(x)[0]]
        for elem in y:
            if elem["atributos"]['Tipo'] == "Wireless":
                ap = AP(self, elem["atributos"]['Espaco'], elem["geometria"]['x'], elem["geometria"]['y'])
                self.aps.append(ap)

class AP:

    def __init__(self, floor, espaco, x, y):
        self.floor = floor
        self.espaco = espaco
        self.x = x
        self.y = y


buildingsInfo = [("Matematica", 11, "ed11/matematica"),
                 ("DETI", 4, "ed4/electronica"),
                 ("Reitoria", 25, "ed25/reitoria"),
                 ("IEETA", 20, "ed20/ieeta"),
                 ("Fisica", 13, "ed13/fisica"),
                 ]

def buildings():
    buildings = []
    resp = requests.get("http://websig.ua.pt/arcgis/rest/services/?f=pjson")
    eds = resp.json()['folders'];
    for ed in eds:
        build = Building(ed)
        buildings.append(build)
    return buildings

def test():
    builds = buildings()
    for b in builds:
        b.update()
        print(b.id)
        for block in b.blocks:
            print("\t" + block.name)
            for floor in block.floors:
                print("\t\t" + floor.name)
                for ap in floor.aps:
                    print("\t\t\t" + "x: " + str(ap.x) + " y: " + str(ap.y))


def updateBD():
    conn = MySQLdb.connect("localhost", "daniel", "131199", "db1")
    c = conn.cursor()

    builds = buildings()
    for b in builds:
        b.update()
        print(b.id)
        try:
            c.execute("insert into Building values (%s)", b.id)
        except:
            print("ERROR")
            sys.exit(1)
        for block in b.blocks:
            print("\t" + block.name)
            try:
                c.execute("insert into Block values (%s,%s)", (b.id, block.name))
            except:
                print("ERROR")
                sys.exit(1)
            for floor in block.floors:
                print("\t\t" + floor.name)
                try:
                    c.execute("insert into Floor values (%s,%s,%s,%s)", (b.id,block.name, floor.name, floor.number))
                except:
                    print("ERROR")
                    sys.exit(1)
                for ap in floor.aps:
                    print("\t\t\t" + "x: " + str(ap.x) + " y: " + str(ap.y))
                    try:
                        c.execute("insert into AP values (%s,%s,%s,%s,%s,%s)",(
                              "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                                 random.randint(0, 255),
                                 random.randint(0, 255)),
                              b.id,
                              block.name,
                              floor.name,
                              ap.x,
                              ap.y))
                    except:
                        print("ERROR")
                        sys.exit(1)

def all():
    buildings = []

    for b in buildingsInfo:
        name, num, ed = b
        building = Building(name, num, ed)
        building.update()
        buildings.append(building)

    for build in buildings:
        print(build.name)
        for floor in build.floors:
            print("\t" + floor.name)
            for ap in floor.aps:
                print("\t\t" + "x: " + str(ap.x) + " y: " + str(ap.y))
        print("")

    print("zzz")

#all()
#test()
updateBD()