const { DBTypeCompany } = require('../../utils/const');
const { maskId } = require('../../utils/mask');
const { repository } = require('./instance');

const ListCompanySlider = async () => {
  try {
    let companies = await repository.listCompanySlider();

    companies = companies.map((company) => ({
      ...company,
      id: maskId(company.id, DBTypeCompany),
    }));

    return companies;
  } catch (error) {
    throw error;
  }
};

module.exports = ListCompanySlider;
