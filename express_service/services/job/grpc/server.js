const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { GRPC_JOB_SERVER, PORT } = require('../configs/index.js');
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../proto/job-service.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);
const { GetJobInformation } = require('../grpc-server-function/job/get-job-grpc.js');
const { UpdateApplyCountGrpc } = require('../grpc-server-function/job/update-apply-count-grpc.js');
const Company = require('../models/company.js');
const { ApproveCompanyGrpc } = require('../grpc-server-function/company/update-status.js');
const { RejectCompanyGrpc } = require('../grpc-server-function/company/reject.js');
const { GetCompaniesStatusGrpc } = require('../grpc-server-function/company/getCompanyStatus.js');

const CreateCompanyGrpc = async (call, callback) => {
  const hrId = call.request.hrId;
  const name = call.request.name;
  const phoneNumber = call.request.phoneNumber;

  const company = {
    hrId,
    name,
    phoneNumber,
  };

  try {
    const newCompany = await Company.create(company);

    return callback(null, { companyId: newCompany.id, isOk: true });
  } catch (error) {
    console.log(error);
    return callback(null, { companyId: '', isOk: false });
  }
};

const CompanyStatusByHrId = async (hrId) => {
  try {
    const company = await Company.findOne({
      where: {
        hrId,
      },
      attributes: ['status'],
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return company.status;
  } catch (error) {
    throw error;
  }
};

const GetCompanyStatus = async (call, callback) => {
  const hrId = call.request.hrId;

  try {
    const status = await CompanyStatusByHrId(hrId);

    return callback(null, { status });
  } catch (error) {
    console.log(error);
    return callback(null, { status: -1 });
  }
};

const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(proto.JobService.service, {
    GetCompaniesStatusGrpc: GetCompaniesStatusGrpc,
    RejectCompanyGrpc: RejectCompanyGrpc,
    GetCompanyStatus: GetCompanyStatus,
    CreateCompanyGrpc: CreateCompanyGrpc,
    GetJobInformation: GetJobInformation,
    UpdateApplyCountGrpc: UpdateApplyCountGrpc,
    ApproveCompanyGrpc: ApproveCompanyGrpc,
  });

  server.bindAsync(`${GRPC_JOB_SERVER}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Server bind failed:', err);
    } else {
      console.log('Job service (gRPC) is running on port', port);
      server.start();
    }
  });
};

module.exports = startGrpcServer;
