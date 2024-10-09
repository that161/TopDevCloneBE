const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');

const DecreaseFollowedCount = async (companyId) => {
  try {
    // Use a transaction to ensure data integrity
    const result = await Company.sequelize.transaction(async (transaction) => {
      // Find the company by ID within the transaction
      const company = await Company.findOne({ where: { id: companyId }, transaction });

      if (!company) {
        throw new DBError('company not found', 'company not found in the database');
      }

      // Update company information with the provided data
      await company.update({ followedCount: company.followedCount - 1 }, { transaction });

      return true;
    });

    return result;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with company DB');
  }
};

module.exports = DecreaseFollowedCount;
