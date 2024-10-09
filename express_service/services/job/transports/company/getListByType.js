const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const GetListByType = async (req, res, next) => {
  const { type } = req.query;
  try {
    const result = await controller.getListByType(type);
    SetResponse(res, STATUS_CODES.OK, result, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = GetListByType;
