const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { GRPC_JOB_SERVER } = require("../configs");
const packageDefinition = protoLoader.loadSync(
    process.env.PROTO_PATH
);
const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const grpcJobClient = new serviceProto.JobService(
    GRPC_JOB_SERVER,
    grpc.credentials.createInsecure()
);

module.exports = grpcJobClient;