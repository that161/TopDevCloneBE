const { Company } = require('./instance');
const { DBError } = require('../../utils/app-errors');

const GetInfoCompany = async (id) => {
  try {
    const result = await Company.findOne({ where: { hrId: id } });
    return result.dataValues;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = GetInfoCompany;
