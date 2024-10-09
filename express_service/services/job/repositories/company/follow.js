const { CompanyFollow } = require('./instance');
const { DBError, BadRequestError } = require('../../utils/app-errors');

const CreateFollow = async (userId, companyId) => {
  try {
    const existingFollow = await CompanyFollow.findOne({
      where: { userId, companyId },
    });

    if (existingFollow) {
      // Return a notification if the follow already exists
      throw new BadRequestError('you already follow this company', 'you already follow this company');
    }

    // Create a new follow record with the provided data
    const newFollow = await CompanyFollow.create({ userId, companyId });

    // Return true if creation was successful
    return newFollow ? true : false;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with follow company creation');
  }
};

const DeleteFollow = async (userId, companyId) => {
  try {
    // Delete the follow record with the provided data
    const result = await CompanyFollow.destroy({
      where: {
        userId: userId,
        companyId: companyId,
      },
    });

    // Return true if a record was deleted
    return result > 0;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with unfollow company deletion');
  }
};

const FindALlByUserId = async (userId, limit, offset) => {
  try {
    const result = await CompanyFollow.findAll({
      where: {
        userId: userId,
      },
      limit: limit,
      offset: offset,
    });

    return result ? result.map((item) => item.dataValues) : [];
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company follow');
  }
};

const CountAll = async (userId) => {
  try {
    const result = await CompanyFollow.count({
      where: {
        userId: userId,
      },
    });

    return result;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company follow');
  }
};

module.exports = { CreateFollow, DeleteFollow, FindALlByUserId, CountAll };
