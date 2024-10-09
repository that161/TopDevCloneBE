const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/pg');
// const sequelize = require('../database/mysql'); // use for local

const CompanyFollow = sequelize.define(
  'companyFollow',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'companyFollows',
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    indexes: [
      {
        unique: true,
        fields: ['userId', 'companyId'], // Define a unique index on userId and companyId
      },
    ],
  },
);

module.exports = CompanyFollow;
