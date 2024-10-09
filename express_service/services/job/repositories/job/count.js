const { Op } = require('sequelize');
const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

const CountJobByConditions = async (searchConditions) => {
  try {
    const jobCount = await Job.count({
      where: searchConditions,
    });

    return jobCount;
  } catch (error) {
    console.log(error);
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = CountJobByConditions;
