const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { FormatJob, FormatCompany } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const FilterCompanyWithSharding = async (companyName) => {
  try {
    console.log('name of company from controller', companyName);
    let company = await repository.filterCompanyWithSharding(companyName);
    console.log('company from controller', company);
    company = FormatCompany(company);
    return company;
  } catch (error) {
    throw error;
  }
};

module.exports = FilterCompanyWithSharding;
