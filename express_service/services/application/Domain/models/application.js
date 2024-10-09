const { DataTypes } = require("sequelize");
const sequelize = require("../../Infrastructure/database/pg");
const { status } = require("@grpc/grpc-js");

const ApplicationModal = sequelize.define("applications", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    jobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cvUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDING"
    }
});

module.exports = ApplicationModal;
