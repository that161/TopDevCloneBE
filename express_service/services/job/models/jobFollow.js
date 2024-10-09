const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/pg');
// const sequelize = require('../database/mysql'); // use for local

const JobFollow = sequelize.define(
  'jobFollow',
  {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    jobId: {
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
    tableName: 'jobFollows',
    timestamps: false, // Disable automatic createdAt and updatedAt fields
    indexes: [
      {
        unique: true,
        fields: ['userId', 'jobId'], // Define a unique index on userId and jobId
      },
    ],
  },
);

module.exports = JobFollow;
