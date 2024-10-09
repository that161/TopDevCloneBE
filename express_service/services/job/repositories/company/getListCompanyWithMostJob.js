const { sequelize } = require('../../database/pg');
const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');

async function GetTopCompaniesWithMostJobs(limit) {
  try {
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
        [sequelize.literal('(SELECT COUNT(*) FROM "jobs" WHERE "jobs"."companyId" = "company"."id")'), '"count_job"'],
      ],
      order: sequelize.literal('"count_job" DESC'), // Use sequelize.literal for sorting
      limit: limit,
      raw: true,
    });

    return topCompanies;
  } catch (error) {
    throw new DBError('DB Error', error.message);
  }
}

module.exports = GetTopCompaniesWithMostJobs;
