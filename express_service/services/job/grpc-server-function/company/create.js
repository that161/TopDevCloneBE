const { repository } = require('./instance');
const { DBTypeCompany } = require('../../utils/const');
const { maskId } = require('../../utils/mask');

const CreateCompanyGrpc = async (call, callback) => {
  try {
    const { hrId, name, phoneNumber } = call.request;

    let checkExists = await repository.findByName(name);

    if (checkExists) {
      return callback(null, {
        companyId: null,
        isOk: false,
      });
    }

    let company = await repository.createCompany({ hrId: hrId, name: name, phoneNumber: phoneNumber, status: 1 });

    callback(null, {
      companyId: maskId(company.id, DBTypeCompany),
      isOk: true,
    });
  } catch (error) {
    callback(null, {
      companyId: null,
      isOk: false,
    });
    console.log(error.message);
  }
};

module.exports = { CreateCompanyGrpc };
