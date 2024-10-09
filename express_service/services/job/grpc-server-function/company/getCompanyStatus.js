const { repository } = require('./instance');
const { COMPANY_STATUS, DBTypeCompany } = require('../../utils/const');
const { maskId } = require('../../utils/mask');

const GetCompaniesStatusGrpc = async (call, callback) => {
  try {
    const { hrIds } = call.request;
    const result = [];

    for (let hrId of hrIds) {
      try {
        const company = await repository.findCompanyByHrId(hrId);
        result.push({
          hrId,
          companyId: maskId(company.id, DBTypeCompany),
          status: company.status,
          logo: company.logo || '',
          name: company.name || '',
          website: company.website || '',
          phoneNumber: company.phoneNumber || '',
          addresses: company.addresses || [],
          nationality: company.nationality || [],
          industry: company.industry || [],
        });
      } catch (error) {
        console.log('error.message', error.message);
      }
    }

    callback(null, {
      result: result,
    });
  } catch (error) {
    callback(null, {
      result: [],
    });
    console.log(error.message);
  }
};

module.exports = { GetCompaniesStatusGrpc };
