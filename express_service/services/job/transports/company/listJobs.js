const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const ListJobsByCompanyId = async (req, res, next) => {
  try {
    const id = req.user.companyId;
    //const id = req.params.id;
    const { status, keywords, page, limit } = req.query;

    const conditions = {
      keywords: keywords || '',

      status: status,
    };

    const jobs = await controller.listJobsByCompanyId(id, conditions, parseInt(limit), parseInt(page));

    SetResponse(res, STATUS_CODES.OK, jobs, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = ListJobsByCompanyId;
