const { DBTypeCompany } = require('../../utils/const');
const { FormatCompany } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
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
      const company = await repository.findCompanyById(item.companyId);

      result.push(
        FormatCompany({
          ...company,
          id: maskId(company.id, DBTypeCompany),
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
