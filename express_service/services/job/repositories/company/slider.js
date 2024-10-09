const { DBError } = require('../../utils/app-errors');
const { Company } = require('./instance');
const { literal } = require('sequelize');

// Implement list companies for slider home page and export
const ListCompanySlider = async () => {
  try {
    const companies = await Company.findAll({
      attributes: [
        'id',
        'name',
        'image',
        'slogan',
        'about',
        'url',
        [
          literal('(SELECT COUNT(*) FROM jobs WHERE jobs."companyId" = "company"."id" AND jobs.status = 1)'),
          'jobCount',
        ],
      ],
      include: [],
      limit: 5,
    });
    return companies ? companies.map((company) => company.toJSON()) : companies;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with company slider DB');
  }
};

module.exports = ListCompanySlider;
