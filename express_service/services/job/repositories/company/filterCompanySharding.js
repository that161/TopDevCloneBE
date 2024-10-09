const { DBError } = require('../../utils/app-errors');
const Company = require('../../models/company.mongo');

const FilterCompanyWithSharding = async (name) => {
  try {
    const companies = await Company.find({ name: { $regex: name, $options: 'i' } }); // Find all companies with name like the given name
    return companies; // Return the modified results
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FilterCompanyWithSharding;
