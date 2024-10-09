const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const FilterCompanyWithSharding = async (req, res, next) => {
  try {
    const name = req.body.name;
    const company = await controller.filterCompanyWithSharding(name);
    SetResponse(res, STATUS_CODES.OK, company, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = FilterCompanyWithSharding;
