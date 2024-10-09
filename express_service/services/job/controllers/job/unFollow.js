const { repository } = require('./instance');
const { DBTypeJob } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const UnFollow = async (jobId, userId) => {
  try {
    jobId = unmaskId(jobId, DBTypeJob);

    if (await repository.deleteFollow(userId, jobId)) {
      await repository.decreaseFollowedCount(jobId);
    }

    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = UnFollow;
