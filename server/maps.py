import requests


class Building:
    def __init__(self, name, id, ed):
        self.name = name
        self.id = id
        self.ed = ed
        self.floors = []

    def update(self):
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

    def __init__(self, name, id, buil, number=-1):
        self.name = name
        self.id = id
        self.number = number
        self.buil = buil
        self.comunicationsID = -1
        self.aps = []

    def update_comunicationsID(self):
        resp = requests.get("http://services.web.ua.pt/arcgis/arcgis?op=infraestruturas&ed="+self.buil.ed+"&p="+str(self.id))
        for inf in resp.json()['infraestruturas'][self.name]:
            if inf['Nome'] is not None and "Comunica" in inf['Nome'] :
                self.comunicationsID = inf['ID']

    def update_aps(self):
        resp = requests.get("http://services.web.ua.pt/arcgis/arcgis?op=elementos&ed="+self.buil.ed+"&p="+str(self.id)+"&i="+str(self.comunicationsID))
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
                 ("DETI", 4, "ed4/electronica")]

def test():
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

test()