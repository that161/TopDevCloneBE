const { AdminController } = require("../../controllers");
const { EmployerController } = require("../../controllers");
const { CandidateController } = require("../../controllers");

const adminController = new AdminController();
const employerController = new EmployerController();
const candidateController = new CandidateController();
module.exports = { adminController, employerController, candidateController };
