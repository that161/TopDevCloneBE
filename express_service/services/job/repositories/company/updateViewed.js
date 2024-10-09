const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');

// Implement create job information here and export
const UpdateViewedCompany = async (id, data, transaction = null) => {
  try {
    // Find the company by ID
    const company = await Company.findOne({ where: { id }, transaction });
    // Update company information with the provided data
    await company.update(data, { transaction });

    // Return updated company data
    return company.dataValues;
  } catch (error) {
    console.log(error);

    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with update company DB');
  }
};

module.exports = UpdateViewedCompany;
