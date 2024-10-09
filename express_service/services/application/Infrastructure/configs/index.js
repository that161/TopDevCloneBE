require("dotenv").config();

const PORT = process.env.PORT;
const GRPC_JOB_SERVER = process.env.GRPC_JOB_SERVER;
const DB_PG_URI = process.env.DB_PG_URI;
const GRPC_AUTH_SERVER = process.env.GRPC_AUTH_SERVER;


module.exports = {
    PORT,
    GRPC_JOB_SERVER,
    DB_PG_URI,
    GRPC_AUTH_SERVER
};
