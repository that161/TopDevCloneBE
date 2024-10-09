const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const UpdateStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const data = req.body;

    const job = await controller.updateStatus(user, data);
    SetResponse(res, STATUS_CODES.OK, job, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = UpdateStatus;
