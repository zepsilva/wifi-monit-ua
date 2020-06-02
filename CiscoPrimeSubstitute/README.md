# CiscoPrimeSubstitute

This service provides a restfull API that tries to clone CISCO PRIME API.
This API copys all his functionalities and data structure. __Universidade de Aveiro__ closed after the global pandemic __COVID-19__ and because of and other problems, we couldn't get access to CISCO API, so we had to make a partial copy of it.

## Operation

CPS generates JSON data that replicates the usage of a typical Wifi Network. The server fetches the API data through HTTP GET calls.

## Installation

We used __Python3__ in this project so if you want to use Python2 the installation variates.
You can install directly in you operating system or in a virtual environment.
In the exemple bellow the requirements are installed in a __virtual environment__ (Python virtualenv). If you want to install with virtualenv you need to install and configure __virtualenv__ first.
Go to the directory you want to install to
```bash
git clone https://github.com/zepsilva/wifi-monit-ua.git
cd wifi-monit-ua/
virtualenv venv
source venv/bin/activate
sudo apt-get update
sudo apt-get install python3
sudo apt-get install python3-pip
pip3 install Flask
pip3 install Flask-RESTful
```

When you want to leave the virtualenv just type
```bash
deactivate
```

## Run API

Go to Module directory:
```bash
cd CiscoPrimeSubstitute/
```
Know you have two options. You can simply run the __API__ like a normal python program (You need to have a terminal open soo the API can stay running):
```bash
python3 CPS.py
```
Or you can create a process that runs in the background and you don't need to have a terminal open.
First, you need to add a shebang line in the Python script:
```python3
#!/usr/bin/env python3
```
Ensure that that __$$PATH__ is correct in your machine.
Next you need to give execute permissions to the file:
```bash
chmod +x CPS.py
```
Now you can run the program with __nohup__.
(Substitute the "path" for your actuall path)
```bash
nohup /path/wifi-monit-ua/CiscoPrimeSubstitute/CPS.py &
```
## Stop 

You can check the process and its process Id with this command:
```bash
ps ax | grep CPS.py
```
If you want to stop the execution, you can kill it with the kill command:
```bash
kill PID
```
or
```bash
pkill -f CPS.py
```

## Calls

- [`/webacs/api/v1/data/AccessPoints`](#`/webacs/api/v1/data/AccessPoints`)
- [`/webacs/api/v1/data/Clients`](#`/webacs/api/v1/data/Clients`)
- [`/webacs/api/v1/data/ClientSessions`](#`/webacs/api/v1/data/ClientSessions`)
- [`/webacs/api/v1/data/ClientSessions/<search_term>`](#`/webacs/api/v1/data/ClientSessions/<search_term>`)

All this calls have the save `uri` has the CISCO PRIME API. Like i said before, this API copys all his functionalities and data structure.

### `/webacs/api/v1/data/AccessPoints`

Know we can make a HTTP GET request to the API with `curl` soo we can get the desired data. You also put the `url` in the browser. The data is sent by a TCP connection with a localhost connection.

#### Example


```bash
curl -v http://127.0.0.1:5000/webacs/api/v1/data/AccessPoints
```
```json
[
{
      "macAddress": "1b:5c:22:b8:9b:7a",
      "ipAddress": "10.0.0.1", 
      "location": "?????",
      "clientCount": 1, 
      "numUsers": 1 
},
{
      "macAddress": "42:71:e2:61:d4:e6", 
      "ipAddress": "10.0.0.2", 
      "location": "?????", 
      "clientCount": 3, 
      "numUsers": 2
}, 
{
      "macAddress": "ed:54:da:24:40:0a", 
      "ipAddress": "10.0.0.3", 
      "location": "?????", 
      "clientCount": 0, 
      "numUsers": 0
},

      ...
      
]
```
### `/webacs/api/v1/data/Clients`
### `/webacs/api/v1/data/ClientSessions`
These two calls are very similar to `/webacs/api/v1/data/AccessPoints`.

### `/webacs/api/v1/data/ClientSessions/<search_term>`
This call was made soo you can filter from the data that you need from `/webacs/api/v1/data/ClientSessions`.

#### Example
Getting the sessions from clients that are connected to AP with macAddress: 40:88:b2:c6:9a:01

```bash
curl http://127.0.0.1:5000/webacs/api/v1/data/ClientSessions/apMacAddress=40:88:b2:c6:9a:01
```
```json
[
{
      "apMacAddress": "40:88:b2:c6:9a:01", 
      "macAddress": "02:00:00:91:f1:00", 
      "protocol": "UNDEFINED", 
      "userName": "auhdrmxh"
}, 
{
      "apMacAddress": "40:88:b2:c6:9a:01", 
      "macAddress": "02:00:00:67:8a:2c", 
      "protocol": "UNDEFINED", 
      "userName": "auhdrmxh"
}, 
{
      "apMacAddress": "40:88:b2:c6:9a:01", 
      "macAddress": "02:00:00:5e:a2:25", 
      "protocol": "UNDEFINED", 
      "userName": "dnfrebcz"
}
]
```
