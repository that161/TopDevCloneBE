const { Company } = require('./instance');
const { DBError } = require('../../utils/app-errors');

const FindCompanyByHrId = async (hrId) => {
  try {
    const result = await Company.findOne({ where: { hrId: hrId } });
    return result.dataValues;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = FindCompanyByHrId;
