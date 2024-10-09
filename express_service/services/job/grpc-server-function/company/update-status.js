const { repository } = require('./instance');
const { sequelize } = require('../../database/pg');
const { COMPANY_STATUS } = require('../../utils/const');

const ApproveCompanyGrpc = async (call, callback) => {
  let transaction;
  try {
    const { hrIds, status } = call.request;

    transaction = await sequelize.transaction();
    for (let hrId of hrIds) {
      if (status === COMPANY_STATUS.ACTIVE) {
        await repository.updateByHrId(hrId, {
          status: Number(status),
          transaction,
        });
      }

      if (status === COMPANY_STATUS.DELETED) {
        await repository.updateByHrId(hrId, {
          status: Number(status),
          transaction,
        });
      }
    }

    transaction.commit();

    callback(null, {
      isOk: true,
    });
  } catch (error) {
    if (transaction) await transaction.rollback();

    callback(null, {
      isOk: false,
    });

    console.log(error.message);
  }
};

module.exports = { ApproveCompanyGrpc };
