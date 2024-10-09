const { DBTypeCompany } = require('../../utils/const');
const { FormatCompany } = require('../../utils/format-result');
const { maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const GetListByType = async (type) => {
  try {
    let companies = [];

    switch (type) {
      case 'ALL':
        companies = await repository.filterCompanyByConditions(null, null, 0, null);
        break;
      case 'TOP':
        companies = await repository.filterCompanyByConditions(null, 12, 0, 'most-viewed');
        break;
      case 'MOST_FOLLOW':
        companies = await repository.filterCompanyByConditions(null, 12, 0, 'popular');
        break;
      case 'LATEST_JOB':
        companies = await repository.getTopCompaniesWithRecentJobs(12);
        break;
      default:
        companies = await repository.filterCompanyByConditions(null, null, 0, null);
        break;
    }

    return companies.map((company) => ({
      ...company,
      id: maskId(company.id, DBTypeCompany),
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = GetListByType;
