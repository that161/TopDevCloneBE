const { repository } = require('./instance');
const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { maskId } = require('../../utils/mask');

const CreateCompany = async (data) => {
  try {
    const result = await repository.createCompany(data);
    result.id = maskId(result.id, DBTypeCompany);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = CreateCompany;
