const { BadRequestError, ForbiddenError } = require('../../utils/app-errors');
const { repository } = require('./instance');
const { sequelize } = require('../../database/pg');
const { USER_ROLE, DBTypeJob, JOB_STATUS } = require('../../utils/const');
const { unmaskId } = require('../../utils/mask');

const UpdateStatus = async (user, data) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const status_allowed = [];

    if (!user.companyId) {
      status_allowed.push(JOB_STATUS.APPROVED);
      status_allowed.push(JOB_STATUS.REJECTED);
    } else {
      status_allowed.push(JOB_STATUS.HIDE);
      status_allowed.push(JOB_STATUS.PUBLIC);
      status_allowed.push(JOB_STATUS.DELETED);
    }

    for (let miniData of data) {
      const id = unmaskId(miniData.id, DBTypeJob);
      const job = await repository.findJobById(id);

      if (!job) {
        throw new BadRequestError('Err repository job layer', 'Job not found');
      }

      // this action for hr
      if (job.status === JOB_STATUS.REJECTED) {
        throw new BadRequestError('Err repository job layer', 'Job already rejected');
      } else if (job.status !== JOB_STATUS.DELETED && status_allowed.includes(miniData.status)) {
        await repository.updateJobById(id, {
          status: miniData.status,
        });
      }
      // this action for admin
      // clean code later
      else if (job.status === JOB_STATUS.PENDING && status_allowed.includes(miniData.status)) {
        await repository.updateJobById(id, {
          status: miniData.status,
          reason: miniData.reason ? miniData.reason : job.reason,
        });
      } else {
        throw new BadRequestError('Err repository job layer', 'Action not allowed');
      }
    }

    transaction.commit();

    return true;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

module.exports = UpdateStatus;
