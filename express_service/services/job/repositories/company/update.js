const { DBError } = require('../../utils/app-errors');
const { DBTypeCompany } = require('../../utils/const');
const { fillNullValue } = require('../../utils/fill-nullValue');
const { unmaskId } = require('../../utils/mask');
const { Company } = require('./instance');

// Implement create job information here and export
const UpdateCompany = async (id, data, transaction = null) => {
  try {
    // handle data before update
    fillNullValue(['city', 'addressDetail'], data.addresses);
    fillNullValue(['facebook', 'linkedin', 'youtube', 'instagram'], data.socialMedia);
    fillNullValue(['question', 'answer'], data.topConcerns);
    fillNullValue(['productPhoto', 'productName', 'link', 'description'], data.products);

    // Find the company by ID
    const company = await Company.findOne({ where: { hrId: id }, transaction });
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

module.exports = UpdateCompany;
