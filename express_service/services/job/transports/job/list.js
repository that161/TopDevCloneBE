const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const ListJobByConditions = async (req, res, next) => {
  try {
    const { keywords, contractTypes, address, levels, jobTypes, page, limit, cursor, status, ordering } = req.query;

    const conditions = {
      keywords: keywords || '',
      contractTypes: contractTypes || '',
      address: address,
      levels: levels || '',
      jobTypes: jobTypes || '',
      status: status,
    };

    const result = await controller.listJobByConditions(conditions, ordering, parseInt(limit), parseInt(page), cursor);
    SetResponse(res, STATUS_CODES.OK, result, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = ListJobByConditions;
