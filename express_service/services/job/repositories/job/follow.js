const { JobFollow } = require('./instance');
const { DBError, BadRequestError } = require('../../utils/app-errors');

const CreateFollow = async (userId, jobId) => {
  try {
    const existingFollow = await JobFollow.findOne({
      where: { userId, jobId },
    });

    if (existingFollow) {
      // Return a notification if the follow already exists
      throw new BadRequestError('you already follow this Job', 'you already follow this Job');
    }

    // Create a new follow record with the provided data
    const newFollow = await JobFollow.create({ userId, jobId });

    // Return true if creation was successful
    return newFollow ? true : false;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with follow job creation');
  }
};

const DeleteFollow = async (userId, jobId) => {
  try {
    // Delete the follow record with the provided data
    const result = await JobFollow.destroy({
      where: {
        userId: userId,
        jobId: jobId,
      },
    });

    // Return true if a record was deleted
    return result > 0;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with unfollow job deletion');
  }
};

const FindALlByUserId = async (userId, limit, offset) => {
  try {
    const result = await JobFollow.findAll({
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
    const result = await JobFollow.count({
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
