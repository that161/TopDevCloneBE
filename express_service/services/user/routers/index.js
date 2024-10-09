const adminRouter = require("./admin");
const candidateRouter = require("./candidate");
const hrRouter = require("./hr");

module.exports = (app) => {
  app.use("/admin", adminRouter);
  // app.use("/employer", hrRouter);
  app.use("/", candidateRouter);
};
