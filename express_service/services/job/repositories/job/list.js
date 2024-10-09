const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

const ListJobByConditions = async (searchConditions, ordering, limit, offset) => {
  try {
    let orderCriteria = [];
    orderCriteria = [['updatedAt', 'DESC']];
    if (ordering === 'hot-jobs') {
      orderCriteria = [
        ['followedCount', 'DESC'],
        ['appliedCount', 'DESC'],
      ];
    }

    const jobs = await Job.findAll({
      where: searchConditions,
      order: orderCriteria,
      limit: limit,
      offset: offset,
    });

    return jobs ? jobs.map((job) => job.dataValues) : null;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = ListJobByConditions;
