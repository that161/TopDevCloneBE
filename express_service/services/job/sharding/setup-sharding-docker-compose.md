## Set up Sharding using Docker Containers

### Build and run mongo instance with docker container

```
cd express_service/services/job/sharding/
docker-compose up -d
```

### Step-by-step setup mongo sharding

#### Step 1: Config servers

```
docker exec -it configserver1 mongosh --port 27019 --eval 'rs.initiate({ _id: "cfgrs", configsvr: true, members: [ { _id: 0, host: "configserver1:27019" }, { _id: 1, host: "configserver2:27019" }, { _id: 2, host: "configserver3:27019" } ] })'
```

#### Step 2: Shard 1 servers

```
docker exec -it shard1server1 mongosh --port 27018 --eval 'rs.initiate({ _id: "shard1rs", members: [ { _id: 0, host: "shard1server1:27018" }, { _id: 1, host: "shard1server2:27018" }, { _id: 2, host: "shard1server3:27018" } ] })'
```

#### Step 3: Shard 2 servers

```
docker exec -it shard2server1 mongosh --port 27018 --eval 'rs.initiate({ _id: "shard2rs", members: [ { _id: 0, host: "shard2server1:27018" }, { _id: 1, host: "shard2server2:27018" }, { _id: 2, host: "shard2server3:27018" } ] })'
```

#### Step 4: Mongos router

```
docker exec -it mongo-router mongosh --port 27017 --eval 'sh.addShard("shard1rs/shard1server1:27018,shard1server2:27018,shard1server3:27018"); sh.addShard("shard2rs/shard2server1:27018,shard2server2:27018,shard2server3:27018"); db = db.getSiblingDB("jobservice"); sh.enableSharding("jobservice"); db.createCollection("company"); sh.shardCollection(db.getName() + ".company", { "name": "hashed" }); db.createCollection("job"); sh.shardCollection(db.getName() + ".job", { "title": "hashed" });'
```
