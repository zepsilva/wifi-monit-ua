 
import MySQLdb
import time

print("x")

conn = MySQLdb.connect("localhost", "testuser", "testpassword", "testdb")

c = conn.cursor()
print(time.time())
c.execute("insert into table1 values (%s, %s, %s)", ("24", "sdffv",time.time()))

#conn.commit()

c.execute("select * from table1")

rows = c.fetchall()

for row in rows:
    print(row)

