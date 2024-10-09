const { repository } = require('./instance');
const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { maskId } = require('../../utils/mask');

const UpdateCompany = async (id, data) => {
  try {
    const result = await repository.updateCompany(id, data);
    result.id = maskId(result.id, DBTypeCompany);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = UpdateCompany;
