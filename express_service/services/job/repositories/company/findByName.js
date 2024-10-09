const { Company } = require('./instance');
const { DBError } = require('../../utils/app-errors');

const FindCompanyByName = async (name) => {
  try {
    const result = await Company.findOne({ where: { name: name } });
    return result ? result.dataValues : null;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FindCompanyByName;
