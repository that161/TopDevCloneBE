
const express = require("express");
const { PORT } = require("./configs/index");
const expressApp = require("./express-app");

const StartServer = async () => {
  const app = express();
  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`User service listening on port ${PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();

