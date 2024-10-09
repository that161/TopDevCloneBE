require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index.js');
const keycloak = require('./services/keycloak.js');
const startGrpcServer = require('./grpc/server.js'); // for grpc

const { PORT } = require('./configuration/app.js');

const app = express();

app.use(keycloak.middleware());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

const errorHandler = (error, req, res, next) => {
  const status = error.status || 422;
  res.status(status).send(error.message);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});

startGrpcServer(); // for grpc
