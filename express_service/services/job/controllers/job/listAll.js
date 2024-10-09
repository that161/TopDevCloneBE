const { repository } = require('./instance');
const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { maskId } = require('../../utils/mask');
const { FormatJob } = require('../../utils/format-result');

const ListAllJob = async () => {
  try {
    const result = await repository.listAllJob();

    result.map((job) => {
      job.id = maskId(job.id, DBTypeJob);
      job.companyId = maskId(job.companyId, DBTypeCompany);
      job.createdBy = maskId(job.createdBy, DBTypeUser);
      return job;
    });

    return result.map((job) => FormatJob(job));
  } catch (error) {
    throw error;
  }
};

module.exports = ListAllJob;
