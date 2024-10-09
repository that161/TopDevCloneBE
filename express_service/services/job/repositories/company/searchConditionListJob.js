const { Op } = require('sequelize');
const { JOB_STATUS } = require('../../utils/const');

const GetSearchConditions = (conditions) => {
  let searchConditions = {};

  // Initialize an array for the 'AND' conditions
  searchConditions[Op.and] = [];

  // Keyword queries
  if (conditions.keywords && conditions.keywords.length > 0) {
    const keywordQueries = conditions.keywords.map((keyword) => ({
      title: { [Op.iLike]: `%${keyword}%` },
    }));

    // Add keyword queries to 'AND' conditions
    searchConditions[Op.and].push({ [Op.or]: keywordQueries });
  }

  // Company ID query
  if (conditions.companyId) {
    searchConditions[Op.and].push({
      companyId: parseInt(conditions.companyId),
    });
  }

  // Status query
  if (conditions.status) {
    if (conditions.status === JOB_STATUS.PUBLIC) {
      searchConditions[Op.and].push({
        [Op.or]: [
          {
            status: {
              [Op.in]: [JOB_STATUS.PUBLIC],
            },
          },
          {
            status: {
              [Op.in]: [JOB_STATUS.APPROVED],
            },
          },
        ],
      });
    } else if (conditions.status === JOB_STATUS.EXPIRED) {
      searchConditions[Op.and].push({
        status: {
          [Op.notIn]: [JOB_STATUS.DELETED],
        },
        endDate: {
          [Op.lt]: new Date(), // endDate is smaller than now
        },
      });
    } else {
      searchConditions[Op.and].push({
        status: {
          [Op.in]: [conditions.status],
        },
      });
    }
  }

  return searchConditions;
};

module.exports = GetSearchConditions;
