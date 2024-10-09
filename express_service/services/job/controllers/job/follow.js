const { repository } = require('./instance');
const { DBTypeJob } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const Follow = async (jobId, userId) => {
  try {
    jobId = unmaskId(jobId, DBTypeJob);

    if (await repository.createFollower(userId, jobId)) {
      await repository.increaseFollowedCount(jobId);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = Follow;
