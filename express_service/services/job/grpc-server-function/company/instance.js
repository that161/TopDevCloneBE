const { JobRepository, CompanyRepository } = require('../../repositories');

const repository = new CompanyRepository();
const jobRepository = new JobRepository();
module.exports = { repository, jobRepository };
