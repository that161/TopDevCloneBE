SHELL := /bin/bash

.PHONY: all config shard mongos

all: config shard mongos

config:
	sleep 5 # Add a delay before config server setup
	docker exec -it configserver1 mongosh --port 27019 \
		--eval 'rs.initiate({ _id: "cfgrs", configsvr: true, members: [ { _id: 0, host: "configserver1:27019" }, { _id: 1, host: "configserver2:27019" }, { _id: 2, host: "configserver3:27019" } ] })'
	sleep 5 # Add a delay after config server setup

shard:
	docker exec -it shardserver1 mongosh --port 27018 \
		--eval 'rs.initiate({ _id: "shardrs", members: [ { _id: 0, host: "shardserver1:27018" }, { _id: 1, host: "shardserver2:27018" }, { _id: 2, host: "shardserver3:27018" } ] })'
	sleep 5 # Add a delay after shard1 setup

mongos:
	sleep 5 # Add a delay after shard1 setup
	docker exec -it mongo-router mongosh --port 27017 \
		--eval 'sh.addShard("shardrs/shardserver1:27018,shardserver2:27018,shardserver3:27018"); db = db.getSiblingDB("jobservice"); sh.enableSharding("jobservice"); db.createCollection("company"); sh.shardCollection(db.getName() + ".company", { "name": "hashed" });'
