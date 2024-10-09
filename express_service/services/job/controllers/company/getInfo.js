const { DBTypeCompany } = require('../../utils/const');
const { maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const GetInfoCompany = async (hrId) => {
  try {
    let company = await repository.getInfoCompany(hrId);
    company.id = maskId(company.id, DBTypeCompany);
    return company;
  } catch (error) {
    throw error;
  }
};

module.exports = GetInfoCompany;
