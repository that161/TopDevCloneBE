const Company = require('../../models/company.mongo');
const { DBError } = require('../../utils/app-errors');

// Implement create job information here and export
const CreateCompanyWithSharding = async (data) => {
  try {
    // Create a new company document
    const company = new Company(data);
    const savedCompany = await company.save();

    // Return the newly created company data
    return savedCompany;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with company creation');
  }
};

module.exports = CreateCompanyWithSharding;
