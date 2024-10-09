const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const UpdateJob = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const hrId = req.user.id;

    const job = await controller.updateJob(id, data, hrId);
    SetResponse(res, STATUS_CODES.OK, job, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = UpdateJob;
