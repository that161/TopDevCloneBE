const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { GRPC_AUTH_SERVER } = require('../configuration/app.js');
const verifyToken = require('../utils/verify.js');
const { getCompaniesStatus } = require('./client.js');
const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../proto/auth-service.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);
// const keycloak = require('../services/keycloak.js');

const isValid = async (call, callback) => {
  const token = call.request.token;
  const role = call.request.role;

  if (!token) {
    console.error('Token is missing in request');
    return callback(null, { valid: false });
  }

  if (!role) {
    console.error('Role is missing in request');
    return callback(null, { valid: false });
  }

  try {
    const resp = await verifyToken(token, role);
    const { status, userId, email } = resp;

    if (role == 'employer') {
      const companies = await getCompaniesStatus({ hrIds: [userId] });

      return callback(null, {
        valid: status,
        userId,
        companyId: companies.result ? companies?.result[0]?.companyId : null,
        email,
      });
    }
    return callback(null, { valid: status, userId, email, companyId: null });
  } catch (error) {
    console.error('Error in isValid function:', error);
    return callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};

const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(proto.AuthService.service, {
    isValid,
  });

  server.bindAsync(`${GRPC_AUTH_SERVER}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Server bind failed:', err);
    } else {
      console.log('Auth service (gRPC) is running on port', port);
    }
  });
};

module.exports = startGrpcServer;
