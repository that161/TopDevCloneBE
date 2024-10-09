const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// Implement list jobs by company and export
const ListJobsByCompanyId = async (searchCondition, limit, offset) => {
  try {
    const jobs = await Job.findAll({ where: searchCondition, limit: limit, offset: offset });
    return jobs ? jobs.map((job) => job.dataValues) : jobs;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = ListJobsByCompanyId;
