const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const CreateCompanyWithSharding = async (req, res, next) => {
  try {
    const data = req.body;
    const company = await controller.createCompanyBySharding(data);
    SetResponse(res, STATUS_CODES.OK, company, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = CreateCompanyWithSharding;
