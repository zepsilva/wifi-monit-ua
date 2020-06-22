import MySQLdb
import time
import json
from datetime import datetime

def getAPSbyFloor(building, block, floor):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    c.execute("select APmac, APx, APy from APbyFloorWithLocation where ID = %s and BlockName = %s and Name = %s", [building, block, floor])

    return c.fetchall()

def getDevicesByAp(APmac, t=time.time(), users = False):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    interval = 3600
    upertime  = datetime.fromtimestamp(t+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(t-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from APinfo where APmac = %s and APTimeStamp < %s and APTimeStamp > %s",[APmac, upertime, lowertime])
    
    entrys = c.fetchall()

    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][1])-t)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[1])
        if abs(entryTime - t) < closestTime:
            closest = entry
            closestTime = abs(entryTime - t)
    if users:
        return closest[3]
    return closest[2]


def getDevicesInBuilding(building, t=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()


    interval = 3600
    upertime  = datetime.fromtimestamp(t+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(t-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from InfoPerBuilding where Building = %s and APTimeStamp < %s and APTimeStamp > %s",[building, upertime, lowertime])

    entrys = c.fetchall()
    print(entrys)    
    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][1])-t)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[1])
        if abs(entryTime - t) < closestTime:
            closest = entry
            closestTime = abs(entryTime - t)

    return closest[2]

def getDevicesInFloor(building, floor, t=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()


    interval = 3600
    upertime  = datetime.fromtimestamp(t+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(t-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from InfoPerFloor where ID = %s and Name = %s and APTimeStamp < %s and APTimeStamp > %s",[building, floor, upertime, lowertime])

    entrys = c.fetchall()
    print(entrys)
    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][3])-t)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[3])
        if abs(entryTime - t) < closestTime:
            closest = entry
            closestTime = abs(entryTime - t)

    return closest[5]


def getUsersInBuilding(building, t=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    interval = 3600
    upertime  = datetime.fromtimestamp(t+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(t-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from UsersByBuilding where Building = %s and APTimeStamp < %s and APTimeStamp > %s",[building, upertime, lowertime])

    entrys = c.fetchall()

    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][1])-t)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[1])
        if abs(entryTime - t) < closestTime:
            closest = entry
            closestTime = abs(entryTime - t)

    return closest[2]

def getUsersInFloor(building, floor, t=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    interval = 3600
    upertime  = datetime.fromtimestamp(t+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(t-interval).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from UsersByFloor where Building = %s and Floor = %s and APTimeStamp < %s and APTimeStamp > %s",[building, floor, upertime, lowertime])

    entrys = c.fetchall()

    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][2])-t)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[2])
        if abs(entryTime - t) < closestTime:
            closest = entry
            closestTime = abs(entryTime - t)

    return closest[3]


def getDevicesInBlock(block, building, time=time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    interval = 3600
    upertime  = datetime.fromtimestamp(time+interval).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(time-interval).strftime('%Y-%m-%d %H:%M:%S')

    
    c.execute("select * from InfoPerBlock where Block = %s and Building = %s and APTimeStamp < %s and APTimeStamp > %s",[block, building, upertime, lowertime])

    entrys = c.fetchall()

    if len(entrys) == 0:
        return None

    closest = entrys[0]
    closestTime = abs(datetime.timestamp(entrys[0][1])-time)

    for entry in entrys:
        entryTime = datetime.timestamp(entry[1])
        if abs(entryTime - time) < closestTime:
            closest = entry
            closestTime = abs(entryTime - time)

    return closest[3]




def getDevicesByHourByAP(ap, year, month, day, hour=None):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')
    if hour is None:
        c.execute("select * from AveragePeopleByApByDay where APmac = %s and Date = %s", [ap, date])
    else:
        c.execute("select * from DevicesByAPByHour where APmac = %s and Date = %s and Hour = %s", [ap, date, hour])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    if hour is None:
        return entrys[0][3]
    else:
        return entrys[0][6]

def getDevicesByHourByBuilding(build, year, month, day, hour=None):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')
    
    if hour is None:
        c.execute("select * from AveragePeopleInABuildingInADay where Building = %s and Date = %s", [build, date])
    else:
         c.execute("select * from DevicesByBuildingByHour where Building = %s and Date = %s and Hour = %s", [build, date, hour])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None
    if hour is None:
        return entrys[0][3]
    else:
        return entrys[0][6]

def getDevicesByHour(year, month, day, hour=None):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')
    if hour is None:
        c.execute("select sum(AvgOfNumOfPeopleInADay) from AveragePeopleInABuildingInADay where Date = %s", [date])
    else:
        c.execute("select sum(AvgOfNumOfPeopleInADay) from DevicesByBuildingByHour where Date = %s and Hour = %s group by Hour", [date, hour])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    return entrys[0][0];

#print(getAPSbyFloor("ed1", "pav1", "Piso 1"))

#for entry in getInfoByAp('286e13139c47', 3):
#    print(datetime.timestamp(entry[1]))

print(getDevicesByHourByBuilding("ed4", 2020,5 , 26))
print(getDevicesByHourByAP("f605e3a05ec3", 2020,5 , 26))
print(getDevicesByHour(2020,5 , 26))
print(getDevicesByHourByBuilding("ed4", 2020,5 , 26, 18))
print(getDevicesByHourByAP("f605e3a05ec3", 2020,5 , 26, 18))
print(getDevicesByHour(2020,5 , 26, 18))
