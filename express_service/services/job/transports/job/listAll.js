const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const ListAllJob = async (req, res, next) => {
  try {
    const result = await controller.listAllJob();

    SetResponse(res, STATUS_CODES.OK, result, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = ListAllJob;
