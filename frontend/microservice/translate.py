import time, json, sys

string1 = sys.argv[1]
string2 = sys.argv[2]


open('frontend/microservice/CCA1.json', 'w').close()
with open('frontend/microservice/CCA1.json', 'w') as request:
    json.dump(string1, request)
with open('frontend/microservice/comm1.txt', 'w') as comm:
    comm.write("first")
time.sleep(2)
with open('frontend/microservice/CCA1.json', 'r') as response:
    analysis1 = json.load(response)
    print(analysis1)

open('frontend/microservice/CCA2.json', 'w').close()
with open('frontend/microservice/CCA2.json', 'w') as request:
    json.dump(string2, request)
with open('frontend/microservice/comm2.txt', 'w') as comm:
    comm.write("second")
time.sleep(2)
with open('frontend/microservice/CCA2.json', 'r') as response:
    analysis2 = json.load(response)
    print(analysis2)

