const Company = require('../../models/company.mongo');
const { DBError } = require('../../utils/app-errors');

const FindCompanyByIdWithSharding = async (id) => {
  try {
    const company = await Company.findById(id);
    if (!company) {
      throw new Error(`Company with id '${id}' not found.`);
    }
    return company;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FindCompanyByIdWithSharding;
