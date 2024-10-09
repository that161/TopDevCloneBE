const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const { GRPC_JOB_SERVER } = require('../configuration/app.js');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../proto/job-service.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);

const jobStub = new proto.JobService(GRPC_JOB_SERVER, grpc.credentials.createInsecure());

const getCompanyStatus = (hrId) => {
  return new Promise((resolve, reject) => {
    jobStub.GetCompanyStatus({ hrId }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const createCompany = (hrId, name, phoneNumber) => {
  return new Promise((resolve, reject) => {
    jobStub.CreateCompanyGrpc({ hrId, name, phoneNumber }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const getCompaniesStatus = ({ hrIds }) => {
  return new Promise((resolve, reject) => {
    jobStub.GetCompaniesStatusGrpc({ hrIds }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const updateCompaniesStatus = ({ hrIds, status }) => {
  return new Promise((resolve, reject) => {
    jobStub.ApproveCompanyGrpc({ hrIds, status }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

const rejectHRWithReason = ({ hrId, reason }) => {
  return new Promise((resolve, reject) => {
    jobStub.RejectCompanyGrpc({ hrId, status: -1, reason }, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = {
  getCompanyStatus,
  createCompany,
  getCompaniesStatus,
  updateCompaniesStatus,
  rejectHRWithReason,
};
