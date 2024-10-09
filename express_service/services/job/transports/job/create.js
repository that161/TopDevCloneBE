const { STATUS_CODES } = require('../../utils/app-errors');
const { ErrorResponse } = require('../../utils/error-handler');
const { SetResponse } = require('../../utils/success-response');
const { controller } = require('./instance');

const CreateJob = async (req, res, next) => {
  try {
    const { id, companyId } = req.user;
    const data = req.body;
    data.createdBy = id;
    data.companyId = companyId;

    const job = await controller.createJob(data);
    SetResponse(res, STATUS_CODES.OK, job, 'OK', null);
  } catch (error) {
    ErrorResponse(error, res);
  }
};

module.exports = CreateJob;
