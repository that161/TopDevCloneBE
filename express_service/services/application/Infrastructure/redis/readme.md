### Development: Run commands below

- Build redis with name **my-redis**: `$ docker build -t my-redis .`
- Run built redis as name **redis-server** : `$ docker run -d --name redis-server -p 6379:6379 my-redis`
- `$ npm start` (dont forget to created a .env file from .env.txt)

### Redis cli usages

- Access redis cli: `$ docker exec -it redis-server redis-cli`
- To close redis terminal: `$ exit`
- List all keys: `$ KEYS *`
- Get data of a key: `$ get <keyname>`
- Remove data of a key: `$ del <keyname>`
