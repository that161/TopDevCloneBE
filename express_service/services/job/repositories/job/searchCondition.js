const { Op } = require('sequelize');
const { JOB_STATUS } = require('../../utils/const');

const GetSearchConditions = (conditions) => {
  let searchConditions = {};

  // Initialize an array for the 'AND' conditions
  searchConditions[Op.and] = [];

  // Keyword queries
  const keywordQueries = [];
  conditions.keywords.forEach((keyword) => {
    keywordQueries.push({ title: { [Op.iLike]: `%${keyword}%` } });
    keywordQueries.push({ technicals: { [Op.iLike]: `%${keyword}%` } });
    keywordQueries.push({ level: { [Op.iLike]: `%${keyword}%` } });
  });

  // Add keyword queries to 'AND' conditions

  if (keywordQueries.length) {
    searchConditions[Op.and].push({ [Op.or]: keywordQueries });
  }

  // Level queries
  const levelQueries = [];
  conditions.levels.forEach((level) => {
    levelQueries.push({ level: { [Op.iLike]: `%${level}%` } });
  });

  // Add level queries to 'AND' conditions
  if (levelQueries.length) {
    searchConditions[Op.and].push({ [Op.or]: levelQueries });
  }

  // Contract type queries
  const contractTypeQueries = [];
  conditions.contractTypes.forEach((contractType) => {
    contractTypeQueries.push({ contractType: { [Op.iLike]: `%${contractType}%` } });
  });

  // Add contract type queries to 'AND' conditions
  if (contractTypeQueries.length) {
    searchConditions[Op.and].push({ [Op.or]: contractTypeQueries });
  }

  // Job type type queries
  const jobTypeQueries = [];
  conditions.jobTypes.forEach((jobType) => {
    jobTypeQueries.push({ jobType: { [Op.iLike]: `%${jobType}%` } });
  });

  // Add contract type queries to 'AND' conditions
  if (jobTypeQueries.length) {
    searchConditions[Op.and].push({ [Op.or]: jobTypeQueries });
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

  // Working place query
  if (conditions.address) {
    searchConditions[Op.and].push({ city: { [Op.iLike]: `%${conditions.address}%` } });
  }

  return searchConditions;
};

module.exports = GetSearchConditions;
