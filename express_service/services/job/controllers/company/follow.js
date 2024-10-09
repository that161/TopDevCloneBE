const { repository } = require('./instance');
const { DBTypeCompany } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const Follow = async (cpnId, userId) => {
  try {
    cpnId = unmaskId(cpnId, DBTypeCompany);

    if (await repository.createFollower(userId, cpnId)) {
      await repository.increaseFollowedCount(cpnId);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = Follow;
