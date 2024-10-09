const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');

const FilterCompanyByConditions = async (searchConditions, limit, offset, ordering) => {
  try {
    let orderCriteria = [];
    orderCriteria = [['updatedAt', 'DESC']];
    if (ordering === 'high-light') {
      orderCriteria = [['applicationCount', 'DESC']];
    } else if (ordering === 'popular') {
      orderCriteria = [['followedCount', 'DESC']];
    } else if (ordering === 'most-viewed') {
      orderCriteria = [['viewedCount', 'DESC']];
    }

    const companies = await Company.findAll({
      where: searchConditions,
      limit: limit,
      offset: offset,
      order: orderCriteria,
    });

    return companies ? companies.map((company) => company.dataValues) : null;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FilterCompanyByConditions;
