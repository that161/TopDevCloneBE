const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { FormatJob } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository, companyRepository } = require('./instance');

const FindJob = async (jobId) => {
  try {
    jobId = unmaskId(jobId, DBTypeJob);

    let job = await repository.findJobById(jobId);

    await repository.updateJobById(jobId, { viewedCount: job.viewedCount + 1 });

    // implement search company here
    job.company = await companyRepository.findCompanyById(job.companyId);
    delete job.companyId;

    job.id = maskId(job.id, DBTypeJob);
    job.company.id = maskId(job.company.id, DBTypeCompany);
    job.createdBy = maskId(job.createdBy, DBTypeUser);

    // format data return
    job = FormatJob(job);

    return job;
  } catch (error) {
    throw error;
  }
};

module.exports = FindJob;
