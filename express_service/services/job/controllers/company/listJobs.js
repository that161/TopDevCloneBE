const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { FormatJob } = require('../../utils/format-result');
const { unmaskId, maskId } = require('../../utils/mask');
const { repository, jobRepository } = require('./instance');


const ListJobsByCompanyId = async (companyId, conditions, limit, page) => {
  try {
    limit = limit || null;
    page = page || null;
    const offset = limit && page ? (page - 1) * limit : 0;
    companyId = unmaskId(companyId, DBTypeCompany);

    conditions.keywords = conditions.keywords !== '' ? conditions.keywords.split('-') : [];
    conditions.companyId = companyId;

    // generate search conditions query from conditions
    const searchConditions = repository.getSearchConditionListJob(conditions);

    const total = await jobRepository.countJobByConditions(searchConditions);
    let jobs = await repository.listJobsByCompanyId(searchConditions, limit, offset);

    jobs = jobs.map((job) => ({
      ...job,
      id: maskId(job.id, DBTypeJob),
      companyId: maskId(job.companyId, DBTypeCompany),
      createdBy: maskId(job.createdBy, DBTypeUser),
    }));

    return {
      data: jobs.map((job) => FormatJob(job)),
      paging: {
        limit: limit,
        page: page,
        total: total,
      },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = ListJobsByCompanyId;
