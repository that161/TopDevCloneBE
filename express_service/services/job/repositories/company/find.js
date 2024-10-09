const { Company } = require('./instance');
const { DBError } = require('../../utils/app-errors');

const FindCompanyById = async (id) => {
  try {
    const result = await Company.findOne({ where: { id } });
    return result.dataValues;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FindCompanyById;
