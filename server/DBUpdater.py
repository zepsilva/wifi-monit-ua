import requests
import time
import time
import datetime
import MySQLdb

conn = MySQLdb.connect("localhost", "api", "api", "APmaps")
c = conn.cursor()
resp = requests.get("http://127.0.0.1:5000/webacs/api/v1/data/AccessPoints")


APdict = {}

c.execute("select * from APbyBlock where Building = 'ed4' and Block = 'electronica'")
i = 0
resp = resp.json()
for ap in c.fetchall():
    APdict[list(resp)[i]['macAddress']] = ap[2]
    i+=1

while(1):
    resp = requests.get("http://127.0.0.1:5000/webacs/api/v1/data/AccessPoints")
    ts = time.time()
    timestamp = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d %H:%M:%S')

    for line in resp.json():
        print (line)
        c.execute("insert into APinfo values (%s,%s,%s)", (APdict[line['macAddress']], timestamp, line['clientCount']))


    
    conn.commit()
    time.sleep(60*10)
