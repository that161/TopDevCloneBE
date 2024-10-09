const { DBTypeCompany } = require('../../utils/const');
const { FormatCompany } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const FilterCompanyByConditions = async (conditions, limit, page) => {
  try {
    limit = limit || null;
    page = page || null;

    const offset = limit && page ? (page - 1) * limit : 0;

    conditions.keywords = conditions.keywords !== '' ? conditions.keywords.split('-') : [];

    // generate search conditions query from conditions
    const searchConditions = repository.getSearchCondition(conditions);

    const total = await repository.countCompanyByConditions(searchConditions);

    let companies = await repository.filterCompanyByConditions(searchConditions, limit, offset, conditions.ordering);

    return {
      data: companies.map((company) => {
        company.id = maskId(company.id, DBTypeCompany);
        return FormatCompany(company);
      }),
      paging: {
        limit: limit,
        page: page,
        total: total,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = FilterCompanyByConditions;
