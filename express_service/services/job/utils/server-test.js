// express-app.js
const express = require('express');
const bodyParser = require('body-parser');
const routers = require('../routers');
const StartSubscriber = require('../utils/pubsub_rabbitmq/jobs/sub');
const grpc = require('@grpc/grpc-js');
const grpcJobServer = require('../grpc-server');
const { GRPC_JOB_SERVER } = require('../configs');

const createServer = async () => {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(__dirname + '/public'));

  StartSubscriber();

  grpcJobServer.bindAsync(GRPC_JOB_SERVER, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Server bind failed:', err);
    } else {
      console.log('gRPC server for Service Transaction running on port', port);
    }
  });

  routers(app);

  return app;
};

module.exports = createServer;
