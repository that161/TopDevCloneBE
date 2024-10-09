const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');

const CountCompanyByConditions = async (searchConditions) => {
  try {
    const count = await Company.count({
      where: searchConditions,
    });

    return count;
  } catch (error) {
    console.log(error);
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = CountCompanyByConditions;
