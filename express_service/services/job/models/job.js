const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/pg');
const { JOB_STATUS } = require('../utils/const');
// const sequelize = require('../database/mysql'); // use for local

const Job = sequelize.define(
  'job',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('level', value.join('|'));
      },
    },
    salaryType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minSalary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    maxSalary: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    technicals: {
      type: DataTypes.TEXT,
      allowNull: true,
      set(value) {
        this.setDataValue('technicals', value.join('|'));
      },
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.STRING, // YYYY-MM-DD
      allowNull: true,
    },
    startDate: {
      type: DataTypes.STRING, // YYYY-MM-DD
      allowNull: true,
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contractType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    benefit: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    skillRequirements: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    interviewProcess: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    followedCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    appliedCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    district: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: JOB_STATUS.PENDING,
    },
    viewedCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { sequelize },
);

module.exports = Job;
