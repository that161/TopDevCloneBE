const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");

const AdminModel = sequelize.define("admins", {
  
});

module.exports = AdminModel;
