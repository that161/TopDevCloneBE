const express = require('express');
const { PORT } = require('./configs/index');
const expressApp = require('./express-app');
const { syncModals } = require('./models/index');
const { connectMongo } = require('./database/mongo');

const StartServer = async () => {
  const app = express();
  await expressApp(app);

  await syncModals();
  await connectMongo();

  app
    .listen(PORT, () => {
      console.log(`Job service listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
