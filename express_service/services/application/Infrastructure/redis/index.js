const redis = require("redis");
let redisClient;

const createRedisClient = async () => {
  try {
    console.log("Connecting to Redis");
    redisClient = redis.createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
    });
    console.log("Connecting to Redis 1");

    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    console.log("Connecting to Redis 2");

    await redisClient.connect();

    console.log("Redis connected");
  } catch (error) {
    console.log("Error in connecting to Redis", error);
  }
};

// expiration is in seconds
const setCacheRedis = async (
  key,
  value,
  expiration = process.env.REDIS_EXPIRATION || 3600
) => {
  try {
    await redisClient.set(key, JSON.stringify(value), {
      EX: expiration,
    });
    console.log(`Data cached with key: ${key}`);
  } catch (error) {
    console.error(`Error setting cache: ${error}`);
  }
};

const getCacheRedis = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Error getting cache: ${error}`);
    return null;
  }
};

module.exports = {
  createRedisClient,
  setCacheRedis,
  getCacheRedis,
};
