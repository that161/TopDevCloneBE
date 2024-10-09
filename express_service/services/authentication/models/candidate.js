const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");

const CandidateModel = sequelize.define("candidates", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    jobPosition: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'jobposition',
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dob:{
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    yearsOfExperience: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
        field: 'yearsofexperience',
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phonenumber',
    },
    socialLink: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'sociallink',
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    technicals: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    softSkills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
        field: 'softskills',
    },
    workExperience: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        field: 'workexperience',
    },
    education: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
    },
    projects: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
    },
    languages: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
    },
    hobbies: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    activities: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
    },
    otherInformations: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        allowNull: true,
        field: 'otherinformations',
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

module.exports = CandidateModel;
