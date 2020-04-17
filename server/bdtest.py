 
import MySQLdb

print("x")

conn = MySQLdb.connect("localhost", "daniel", "131199", "db1")

c = conn.cursor()

c.execute("insert into test values (%s)", "3")

c.execute("select * from test")

rows = c.fetchall()

for row in rows:
    print(row)
