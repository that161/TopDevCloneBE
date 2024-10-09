const { DBError } = require('../../utils/app-errors');
const { fillNullValue } = require('../../utils/fill-nullValue');
const { Company } = require('./instance');

// Implement create job information here and export
const CreateCompany = async (data) => {
  try {
    // handle data before create
    fillNullValue(['city', 'addressDetail'], data.addresses);
    fillNullValue(['facebook', 'linkedin', 'youtube', 'instagram'], data.socialMedia);
    fillNullValue(['question', 'answer'], data.topConcerns);
    fillNullValue(['productPhoto', 'productName', 'link', 'description'], data.products);

    // Create a new company with the provided data
    const newCompany = await Company.create(data);

    // Return the newly created company data
    return newCompany.dataValues;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with company creation');
  }
};

module.exports = CreateCompany;
