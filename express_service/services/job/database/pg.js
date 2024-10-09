const { Sequelize } = require('sequelize');
const { DB_PG_URI } = require('../configs');

const sequelize = new Sequelize(DB_PG_URI, {
  ssl: true,
  dialect: 'postgres',
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

module.exports = { sequelize };
