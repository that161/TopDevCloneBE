const { DBError, NotFoundException } = require('../../utils/app-errors');
const { Job } = require('./instance');

const IncreaseFollowedCount = async (jobId) => {
  try {
    // Use a transaction to ensure data integrity
    const result = await Job.sequelize.transaction(async (transaction) => {
      // Find the job by ID within the transaction
      const job = await Job.findOne({ where: { id: jobId }, transaction });

      if (!job) {
        throw new NotFoundException('Job not found', 'Job not found in the database');
      }

      // Update job information with the provided data
      await job.update({ followedCount: job.followedCount + 1 }, { transaction });
      return true;
    });

    return result;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = IncreaseFollowedCount;
