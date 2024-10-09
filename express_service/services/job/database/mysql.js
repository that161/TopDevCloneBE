const { Sequelize } = require('sequelize');
const { DB_MYSQL_DBNAME, DB_MYSQL_USERNAME, DB_MYSQL_PASSWORD, DB_MYSQL_HOST } = require('../configs');

const sequelize = new Sequelize(DB_MYSQL_DBNAME, DB_MYSQL_USERNAME, DB_MYSQL_PASSWORD, {
  host: DB_MYSQL_HOST,
  dialect: 'mysql',
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
