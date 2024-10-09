const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const FindCompanyByIdWithSharding = async (req, res, next) => {
  try {
    const id = req.params.id;
    const company = await controller.findCompanyByIdWithSharding(id);
    SetResponse(res, STATUS_CODES.OK, company, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = FindCompanyByIdWithSharding;
