const { DBTypeJob, DBTypeCompany } = require('../../utils/const');
const { FormatJob } = require('../../utils/format-result');
const { maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const ListFollowOfCandidate = async (userId, limit, page) => {
  try {
    limit = limit || null;
    page = page || null;
    const offset = limit && page ? (page - 1) * limit : 0;

    const follows = await repository.findAllFollowByUserId(userId, limit, offset);
    const total = await repository.CountAllFollow(userId);

    const result = [];

    for (let item of follows) {
      const job = await repository.findJobById(item.jobId);

      result.push(
        FormatJob({
          ...job,
          id: maskId(job.id, DBTypeJob),
          companyId: maskId(job.companyId, DBTypeCompany),
        }),
      );
    }

    return {
      data: result,
      limit: limit,
      page: page,
      total: total,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = ListFollowOfCandidate;
