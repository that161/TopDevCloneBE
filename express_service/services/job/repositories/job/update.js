const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// Implement update job information here and export
const UpdateJobInfo = async (jobId, data, transaction = null) => {
  let job;

  try {
    if (!jobId) return false;
    // Find the job by ID within the transaction if provided
    job = await Job.findOne({ where: { id: jobId }, transaction });

    if (!job) return false;

    // Update job information with the provided data
    await job.update(data, { transaction });

    if (job.dataValues?.startDate == null) return false;

    // Return updated job data
    return job.dataValues ? true : false;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = UpdateJobInfo;
