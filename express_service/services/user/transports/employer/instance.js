const { CandidateController, EmployerController } = require("../../controllers");

const candidateController = new CandidateController();
const employerController = new EmployerController();

module.exports = { candidateController, employerController };
