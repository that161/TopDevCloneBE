const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const FindJob = async (req, res, next) => {
  try {
    const id = req.params.id;

    console.log("Find job id: " + id)

    const job = await controller.findJob(id);
    SetResponse(res, STATUS_CODES.OK, job, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = FindJob;
