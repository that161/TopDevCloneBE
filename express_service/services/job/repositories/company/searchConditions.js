const { Op } = require('sequelize');
const { sequelize } = require('../../database/pg');

const GetSearchConditions = (conditions) => {
  let searchConditions = {};

  // Initialize an array for the 'AND' conditions
  searchConditions[Op.and] = [];

  // Keyword queries
  const keywordQueries = [];
  conditions.keywords.forEach((keyword) => {
    keywordQueries.push({ name: { [Op.iLike]: `%${keyword}%` } });
  });

  // Add keyword queries to 'AND' conditions
  if (keywordQueries.length) {
    searchConditions[Op.and].push({ [Op.or]: keywordQueries });
  }

  // Working place query
  if (conditions.address) {
    const addressCondition = conditions.address.replace(/'/g, "''"); // Escape single quotes to prevent SQL injection
    const addressQuery = sequelize.literal(
      `jsonb_path_exists(
      addresses::jsonb,
      '$[*] ? (@.city like_regex ".*${addressCondition}.*" flag "i" || @.addressDetail like_regex ".*${addressCondition}.*" flag "i")'
    )`,
    );

    searchConditions[Op.and].push(addressQuery);
  }

  if (conditions.status) {
    searchConditions[Op.and].push({ status: { [Op.in]: [conditions.status] } });
  }

  return searchConditions;
};

module.exports = GetSearchConditions;
