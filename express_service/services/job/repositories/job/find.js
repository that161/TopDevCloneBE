const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// implement find job here and export
const FindJobById = async (jobId) => {
  try {
    const job = await Job.findOne({ where: { id: jobId } });
    return job ? job.dataValues : job;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = FindJobById;
