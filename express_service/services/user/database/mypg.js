const { Sequelize } = require('sequelize');
const { 
  DB_PG_URI, 
  DB_POSTGRE_USERNAME, 
  DB_POSTGRE_PASSWORD, 
  DB_POSTGRE_DBNAME, 
  DB_POSTGRE_HOST, 
  DB_POSTGRE_PORT 
} = require('../configs');

const sequelize = new Sequelize(DB_PG_URI, {
  ssl: true,
  dialect: 'postgres',
  logging: false,
});

// for local testing
// const sequelize = new Sequelize(DB_POSTGRE_DBNAME, DB_POSTGRE_USERNAME, DB_POSTGRE_PASSWORD, {
//   port: DB_POSTGRE_PORT,
//   host: DB_POSTGRE_HOST,
//   dialect: 'postgres',
//   logging: false,
//   ssl: true,
// });


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
