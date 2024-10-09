const { DBTypeCompany, DBTypeJob } = require('../../utils/const');
const { FormatJob } = require('../../utils/format-result');
const { maskId } = require('../../utils/mask');
const { repository, jobRepository } = require('./instance');
const { Op } = require('sequelize');

const HomePage = async () => {
  try {
    let supperSpotlight = []; // top 5 follow
    let featured = []; // top 6 max jobs
    let popular = []; // top 9 view

    popular = await repository.filterCompanyByConditions(
      {
        jobCount: {
          [Op.gte]: 1, // Greater than or equal to 1
        },
      },
      9,
      0,
      'most-viewed',
    );

    for (let i = 0; i < popular.length; i++) {
      const job = await jobRepository.findLatestJobByCompanyId(popular[i].id);

      popular[i] = {
        ...popular[i],
        job: FormatJob({
          ...job,
          id: maskId(job?.id, DBTypeJob),
        }),
      };
    }

    supperSpotlight = await repository.filterCompanyByConditions(null, 5, 0, 'popular');

    featured = await repository.getTopCompaniesWithMostJobs(6);

    return {
      popular: popular.map((company) => ({
        ...company,
        id: maskId(company.id, DBTypeCompany),
      })),
      supperSpotlight: supperSpotlight.map((company) => ({
        ...company,
        id: maskId(company.id, DBTypeCompany),
      })),
      featured: featured.map((company) => ({
        ...company,
        id: maskId(company.id, DBTypeCompany),
      })),
    };
  } catch (error) {
    console.log(error);

    throw error;
  }
};

module.exports = HomePage;
