const { repository } = require('./instance');
const { DBTypeJob, DBTypeCompany } = require('../../utils/const');
const { maskId, unmaskId } = require('../../utils/mask');
const { FormatJob } = require('../../utils/format-result');

const CreateJob = async (data) => {
  try {
    data.companyId = unmaskId(data.companyId, DBTypeCompany);

    const result = await repository.createJob(data);

    result.id = maskId(result.id, DBTypeJob);
    result.companyId = maskId(result.companyId, DBTypeCompany);

    return FormatJob(result);
  } catch (error) {
    throw error;
  }
};

module.exports = CreateJob;
