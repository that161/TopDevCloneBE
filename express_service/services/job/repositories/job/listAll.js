const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// Implement list all job information here and export
const ListAllJob = async () => {
  try {
    // Find all jobs
    const jobs = await Job.findAll();
    // Return all jobs
    return jobs ? jobs.map((job) => job.dataValues) : null;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with get all jobs');
  }
};

module.exports = ListAllJob;
