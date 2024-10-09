const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../database/mypg");

const CVModel = sequelize.define("cvs", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  listJobApplied: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    field: 'listjob',
  },
  link: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  isMain: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'is_main',
  },
  archived: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
    field: 'archived',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = CVModel;
