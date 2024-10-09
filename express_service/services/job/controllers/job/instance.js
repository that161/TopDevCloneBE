const { JobRepository, CompanyRepository } = require("../../repositories");

const repository = new JobRepository();
const companyRepository = new CompanyRepository();
module.exports = { repository, companyRepository };
