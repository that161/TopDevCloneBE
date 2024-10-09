const express = require(`express`);
const auth = require("../../Infrastructure/middlewares/auth");
const { ApplicationTransport } = require("../transports");
const applicationRouter = express.Router();
const transport = new ApplicationTransport();

applicationRouter.post("/", transport.applyJob);
applicationRouter.get("/list-apply/:id", auth(['employer']), transport.listApply);
applicationRouter.patch("/:id", auth(['employer']), transport.updateProcessApplication);
applicationRouter.get("/:id", auth(['employer', 'candidate']), transport.detailApply);
applicationRouter.get("/user/list", auth(['candidate']), transport.listApplyOfUser);

module.exports = applicationRouter;
