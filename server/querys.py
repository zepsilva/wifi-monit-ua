import MySQLdb
import time
from datetime import datetime

def getAPSbyFloor(building, block, floor):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    c.execute("select APmac, APx, APy from APbyFloorWithLocation where ID = %s and BlockName = %s and Name = %s", [building, block, floor])

    return c.fetchall()

def getInfoByAp(APmac, time=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    interval = 3600000
    upertime  = datetime.fromtimestamp(time+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(time-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from APinfo where APmac = %s and APTimeStamp < %s and APTimeStamp > %s",[APmac, upertime, lowertime])
    
    entrys = c.fetchall()
    [print(entry) for entry in entrys]
    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][1])-time)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[1])
        if abs(entryTime - time) < closestTime:
            closest = entry
            closestTime = abs(entryTime - time)

    return closest[2]

#print(getAPSbyFloor("ed1", "pav1", "Piso 1"))

#for entry in getInfoByAp('286e13139c47', 3):
#    print(datetime.timestamp(entry[1]))

print(getInfoByAp('286e13139c47', 1587663900.0))
print(getInfoByAp('286e13139c47'))


