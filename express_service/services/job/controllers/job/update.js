const { BadRequestError, ForbiddenError } = require('../../utils/app-errors');
const { repository } = require('./instance');
const { DBTypeJob } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const UpdateJob = async (jobId, data, hrId) => {
  try {
    jobId = unmaskId(jobId, DBTypeJob);
    const job = await repository.findJobById(jobId);

    if (!job) {
      throw new BadRequestError('Job not found', 'Err repository job layer');
    }

    if (job.createdBy !== hrId) {
      throw new ForbiddenError('You had no permission', 'not allowed to update! You are not owner of this job');
    }

    let result = await repository.updateJobById(jobId, data);

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = UpdateJob;
