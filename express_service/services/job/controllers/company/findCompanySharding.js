const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { FormatJob, FormatCompany } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const FindCompanyByIdWithSharding = async (companyId) => {
  try {
    let company = await repository.findCompanyByIdWithSharding(companyId);
    company.id = companyId;
    company = FormatCompany(company);
    return company;
  } catch (error) {
    throw error;
  }
};

module.exports = FindCompanyByIdWithSharding;
