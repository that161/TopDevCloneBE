const express = require("express");
const { PORT } = require("./Infrastructure/configs/index");
const expressApp = require("./express-app");
const syncModals = require("./Domain/models/index");
const { createRedisClient } = require("./Infrastructure/redis");

const StartServer = async () => {
  const app = express();
  await expressApp(app);
  await syncModals();
  //await createRedisClient();

  app
    .listen(PORT, () => {
      console.log(`Application service listening on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
