const express = require(`express`);
const auth = require("../middlewares/auth");
const { AdminTransport } = require("../transports");
const adminRouter = express.Router();
const transport = new AdminTransport();

adminRouter.get(
  "/candidates/condition",
  auth,
  transport.listCandidatesByCondition
);
adminRouter.get("/candidates/:id", auth, transport.candidateInfo);
adminRouter.get("/candidates", auth, transport.listCandidates);

adminRouter.get(
  "/employers/condition",
  auth,
  transport.listEmployersByCondition
);
// adminRouter.patch("/employers/updateManyHRstatus", auth,transport.updateManyHRStatus);
// adminRouter.patch("/employers/updateHRstatus", auth,transport.updateHRStatus);
adminRouter.patch("/employers/:id", auth, transport.updateEmployer);
adminRouter.get("/employers/:id", auth, transport.employerInfo);
adminRouter.get("/employers", auth, transport.listEmployers);

module.exports = adminRouter;
