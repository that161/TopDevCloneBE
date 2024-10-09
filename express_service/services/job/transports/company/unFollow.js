const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const UnFollow = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const company = await controller.unFollow(id, userId);
    SetResponse(res, STATUS_CODES.OK, company, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = UnFollow;
