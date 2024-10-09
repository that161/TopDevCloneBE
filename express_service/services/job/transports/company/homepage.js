const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');
const os = require('os');

const HomePage = async (req, res, next) => {
  try {
    const result = await controller.homepage();
    result.hostname = os.hostname();
    result.machine = os.hostname();
    SetResponse(res, STATUS_CODES.OK, result, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = HomePage;
