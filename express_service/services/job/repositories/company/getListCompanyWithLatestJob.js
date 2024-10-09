const { Company } = require('./instance');
const { DBError } = require('../../utils/app-errors');
const { sequelize } = require('../../database/pg');

async function GetTopCompaniesWithRecentJobs(limit) {
  try {
    const countCompanyHasNoJob = await Company.count({
      where: sequelize.literal('id NOT IN (SELECT DISTINCT "companyId" FROM "jobs")'),
    });

    const topCompanies = await Company.findAll({
      attributes: [
        'id',
        'name',
        'companySize',
        'benefits',
        'status',
        'followedCount',
        'createdAt',
        'updatedAt',
        'logo',
        'tagline',
        'nationality',
        'industry',
        'techStack',
        'website',
        'socialMedia',
        'addresses',
        'coverPhoto',
        'galleries',
        'topConcerns',
        'products',
        'applicationCount',
        'viewedCount',
        'phoneNumber',
        [
          sequelize.literal('(SELECT MAX("jobs"."createdAt") FROM "jobs" WHERE "jobs"."companyId" = "company"."id")'),
          'latest_job_created_at',
        ],
      ],
      order: sequelize.literal('latest_job_created_at DESC'), // Use sequelize.literal for sorting
      limit: limit,
      offset: countCompanyHasNoJob,
      raw: true,
    });

    return topCompanies;
  } catch (error) {
    throw new DBError('DB Error', error.message);
  }
}

module.exports = GetTopCompaniesWithRecentJobs;
