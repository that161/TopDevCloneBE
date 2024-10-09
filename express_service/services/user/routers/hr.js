const express = require(`express`);
const auth = require("../middlewares/auth");
const { EmployerTransport } = require("../transports");
const hrRouter = express.Router();
const transport = new EmployerTransport();

hrRouter.get('/profile/:id', auth, transport.hrInfo);
hrRouter.patch('/profile/:id', auth, transport.hrUpdate);
hrRouter.get('/candidate/:id', auth, transport.hrGetCandidateInfo);

module.exports = hrRouter;