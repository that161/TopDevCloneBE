const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(process.env.PROTO_PATH);
const { GetJobInformation } = require('./grpc-server-function/job/get-job-grpc');
const { UpdateApplyCountGrpc } = require('./grpc-server-function/job/update-apply-count-grpc');
const { CreateCompanyGrpc } = require('./grpc-server-function/company/create');

const serviceProto = grpc.loadPackageDefinition(packageDefinition);

const grpJobServer = new grpc.Server();

grpJobServer.addService(serviceProto.JobService.service, {
  GetJobInformation: GetJobInformation,
  UpdateApplyCountGrpc: UpdateApplyCountGrpc,
  CreateCompanyGrpc: CreateCompanyGrpc,
});

module.exports = grpJobServer;
