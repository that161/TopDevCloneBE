require('dotenv').config();

const PORT = process.env.PORT;
const DB_MYSQL_USERNAME = process.env.DB_MYSQL_USERNAME;
const DB_MYSQL_PASSWORD = process.env.DB_MYSQL_PASSWORD;
const DB_MYSQL_DBNAME = process.env.DB_MYSQL_DBNAME;
const DB_MYSQL_HOST = process.env.DB_MYSQL_HOST;
const GRPC_JOB_SERVER = process.env.GRPC_JOB_SERVER;

const DB_PG_URI = process.env.DB_PG_URI;
const DB_MONGO_URI = process.env.DB_MONGO_URI;
const RABBITMQ_CONNECTION_STRING = process.env.RABBITMQ_CONNECTION_STRING;

const AUTH_HOST = process.env.AUTH_HOST;
const GRPC_AUTH_SERVER = process.env.GRPC_AUTH_SERVER;

module.exports = {
  PORT,
  DB_MYSQL_USERNAME,
  DB_MYSQL_DBNAME,
  DB_MYSQL_PASSWORD,
  DB_MYSQL_HOST,
  RABBITMQ_CONNECTION_STRING,
  DB_PG_URI,
  GRPC_JOB_SERVER,
  DB_MONGO_URI,
  AUTH_HOST,
  GRPC_AUTH_SERVER,
};
