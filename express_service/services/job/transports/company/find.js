const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const FindCompanyById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const company = await controller.findCompanyById(id);
    SetResponse(res, STATUS_CODES.OK, company, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = FindCompanyById;
