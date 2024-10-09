const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const { GRPC_AUTH_SERVER } = require('../configs/index.js');

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../../proto/auth-service.proto'));
const proto = grpc.loadPackageDefinition(packageDefinition);

const authStub = new proto.AuthService(GRPC_AUTH_SERVER, grpc.credentials.createInsecure());

const isValidToken = (token, role) => {
  return new Promise((resolve, reject) => {
    authStub.isValid({ token, role }, (err, response) => {
      //   console.log('Token:', token);
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
};

module.exports = isValidToken;
