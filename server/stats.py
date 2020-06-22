import MySQLdb
import time
import json
from datetime import datetime

def mostBusyHour(day, month, year):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')

    c.execute("select Date, Hour, sum(AvgOfNumOfPeopleInADay) from DevicesByBuildingByHour where Date = %s group by Hour",[date])

    maiorValue = 0
    maior = None

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    for entry in entrys:
        if entry[2] > maiorValue:
            maiorValue = entry[2]
            maior = entry

    return maior



def mostBusyHourByBuilding(day, month, year, build):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')

    c.execute("select * from DevicesByBuildingByHour where Building = %s and Date = %s",[build, date])

    maiorValue = 0
    maior = None
    
    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    for entry in entrys:
        if entry[6] > maiorValue:
            maiorValue = entry[6]
            maior = entry

    return maior


def mostBusyHourByAP(day, month, year, ap):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    lowerTimestr = "{y}-{m}-{d} 0:0:0".format(y = year, m = month, d = day)
    date = datetime.strptime(lowerTimestr, '%Y-%m-%d %H:%M:%S')

    c.execute("select * from DevicesByAPByHour where APmac = %s and Date = %s",[ap, date])

    maiorValue = 0
    maior = None

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    for entry in entrys:
        if entry[6] > maiorValue:
            maiorValue = entry[6]
            maior = entry

    return maior



def mostBusyDayOfLastWeekByBuilding(build, time = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    upertime  = datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(time-604800).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from AveragePeopleInABuildingInADay where Building = %s and Date <= %s and Date >= %s",[build, upertime, lowertime])
    entrys = c.fetchall()
    if len(entrys) == 0:
        return None
    
    maiorValue = 0
    maior = None

    for entry in entrys:
        if entry[3] > maiorValue:
            maiorValue = entry[3]
            maior = entry

    return maior


def mostBusyDayOfLastWeek(time = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    upertime  = datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(time-604800).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select Date, sum(AvgOfNumOfPeopleInADay) from AveragePeopleInABuildingInADay where Date <= %s and Date >= %s",[ upertime, lowertime])
    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    maiorValue = 0
    maior = None

    for entry in entrys:
        if entry[1] > maiorValue:
            maiorValue = entry[1]
            maior = entry

    return maior


def mostBusyDayOfLastWeekByAp(ap, time = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()

    upertime  = datetime.fromtimestamp(time).strftime('%Y-%m-%d %H:%M:%S')
    lowertime = datetime.fromtimestamp(time-604800).strftime('%Y-%m-%d %H:%M:%S')

    c.execute("select * from AveragePeopleByApByDay where APmac = %s and Date <= %s and Date >= %s",[ap, upertime, lowertime])
    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    maiorValue = 0
    maior = None

    for entry in entrys:
        if entry[3] > maiorValue:
            maiorValue = entry[3]
            maior = entry

    return maior


def last24HoursByAp(ap, time = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    
    
    lowerdate = datetime.fromtimestamp(time-24*60*60)#.strftime('%Y-%m-%d %H:%M:%S')

    upperdate = datetime.fromtimestamp(time)#.strftime('%Y-%m-%d %H:%M:%S')

    lowerhour = lowerdate.hour

    upperhour = upperdate.hour

    lowerdate = lowerdate.strftime('%Y-%m-%d')

    upperdate = upperdate.strftime('%Y-%m-%d')

    c.execute("select * from DevicesByAPByHour where APmac = %s and ((Date = %s and Hour > %s) or (Date = %s and Hour < %s))order by Date, Hour",[ap, lowerdate, lowerhour, upperdate, upperhour])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    res = []

    for entry in entrys:
        res.append(float(entry[6]))

    return res


def last24HoursByBuilding(building, t = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()
    
    lowerdate = datetime.fromtimestamp(t-24*60*60)#.strftime('%Y-%m-%d %H:%M:%S')
    
    upperdate = datetime.fromtimestamp(t)#.strftime('%Y-%m-%d %H:%M:%S')

    lowerhour = lowerdate.hour

    upperhour = upperdate.hour

    lowerdate = lowerdate.strftime('%Y-%m-%d')
    
    upperdate = upperdate.strftime('%Y-%m-%d')

    c.execute("select * from DevicesByBuildingByHour where Building = %s and ((Date = %s and Hour > %s) or (Date = %s and Hour < %s))order by Date, Hour",[building, lowerdate, lowerhour, upperdate, upperhour])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    res = []

    for entry in entrys:
        res.append(float(entry[6]))

    return res


def last7DaysByAp(ap, time = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()


    lowerdate = datetime.fromtimestamp(time-7*24*60*60)#.strftime('%Y-%m-%d %H:%M:%S')

    upperdate = datetime.fromtimestamp(time)#.strftime('%Y-%m-%d %H:%M:%S')

    lowerdate = lowerdate.strftime('%Y-%m-%d')

    upperdate = upperdate.strftime('%Y-%m-%d')

    c.execute("select * from AveragePeopleByApByDay where APmac = %s and Date > %s and Date < %s order by Date",[ap, lowerdate, upperdate])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    res = []

    for entry in entrys:
        res.append(float(entry[3]))

    return res


def last7DaysByBuilding(build, t = time.time()):
    conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
    c = conn.cursor()


    lowerdate = datetime.fromtimestamp(t-8*24*60*60)#.strftime('%Y-%m-%d %H:%M:%S')

    upperdate = datetime.fromtimestamp(t-1*24*60*60)#.strftime('%Y-%m-%d %H:%M:%S')

    lowerdate = lowerdate.strftime('%Y-%m-%d')

    upperdate = upperdate.strftime('%Y-%m-%d')

    c.execute("select * from AveragePeopleInABuildingInADay where Building = %s and Date >= %s and Date <= %s order by Date",[build, lowerdate, upperdate])

    entrys = c.fetchall()
    if len(entrys) == 0:
        return None

    res = []

    for entry in entrys:
        res.append(float(entry[3]))

    return res



print(mostBusyDayOfLastWeekByBuilding("ed11"))

print(mostBusyHourByAP(26, 5, 2020, "f605e3a05ec3"))

print(mostBusyHour(26,5,2020))

print(mostBusyDayOfLastWeek())

print(mostBusyDayOfLastWeekByAp("f605e3a05ec3"))

print(last24HoursByBuilding("ed4"))

print(last24HoursByAp("f605e3a05ec3"))



