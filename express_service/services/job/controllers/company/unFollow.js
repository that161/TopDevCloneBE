const { repository } = require('./instance');
const { DBTypeCompany } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const UnFollow = async (cpnId, userId) => {
  try {
    cpnId = unmaskId(cpnId, DBTypeCompany);

    if (await repository.deleteFollow(userId, cpnId)) {
      await repository.decreaseFollowedCount(cpnId);
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = UnFollow;
