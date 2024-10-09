const { repository } = require('./instance');
const { COMPANY_STATUS } = require('../../utils/const');

const RejectCompanyGrpc = async (call, callback) => {
  try {
    const { hrId, status, reason } = call.request;

    if (status === COMPANY_STATUS.DELETED) {
      await repository.updateByHrId(hrId, {
        status: Number(status),
        reason: reason,
      });
    }

    callback(null, {
      isOk: true,
    });
  } catch (error) {
    callback(null, {
      isOk: false,
    });
    console.log(error.message);
  }
};

module.exports = { RejectCompanyGrpc };
