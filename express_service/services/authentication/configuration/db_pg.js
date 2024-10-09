require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    DB_POSTGRE_USERNAME: process.env.DB_POSTGRE_USERNAME,
    DB_POSTGRE_PASSWORD: process.env.DB_POSTGRE_PASSWORD,
    DB_POSTGRE_DBNAME: process.env.DB_POSTGRE_DBNAME,
    DB_POSTGRE_HOST: process.env.DB_POSTGRE_HOST,
    DB_POSTGRE_PORT: process.env.DB_POSTGRE_PORT,
    DB_PG_URI: process.env.DB_PG_URI,
};
