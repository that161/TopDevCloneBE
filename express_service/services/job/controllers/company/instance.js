const { CompanyRepository } = require('../../repositories');
const repository = new CompanyRepository();

const { JobRepository } = require('../../repositories');
const jobRepository = new JobRepository();

module.exports = { repository, jobRepository };
