require("dotenv").config();

const PORT = process.env.PORT;
const DB_POSTGRE_USERNAME = process.env.DB_POSTGRE_USERNAME;
const DB_POSTGRE_PASSWORD = process.env.DB_POSTGRE_PASSWORD;
const DB_POSTGRE_DBNAME = process.env.DB_POSTGRE_DBNAME;
const DB_POSTGRE_HOST = process.env.DB_POSTGRE_HOST;
const DB_POSTGRE_PORT = process.env.DB_POSTGRE_PORT;
const DB_PG_URI = process.env.DB_PG_URI;

module.exports = {
  PORT,
  DB_POSTGRE_USERNAME,
  DB_POSTGRE_PASSWORD,
  DB_POSTGRE_DBNAME,
  DB_POSTGRE_HOST,
  DB_POSTGRE_PORT,
  DB_PG_URI,
};
