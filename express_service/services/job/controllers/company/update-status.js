const { repository } = require('./instance');
const { sequelize } = require('../../database/pg');
const { COMPANY_STATUS } = require('../../utils/const');

const UpdateCompaniesStatus = async (data) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    for (let company of data) {
      const id = company.id;

      if (company.status === COMPANY_STATUS.ACTIVE) {
        await repository.updateCompany(id, {
          status: Number(company.status),
        });
      } else if (company.status === COMPANY_STATUS.DELETED) {
        await repository.updateCompany(id, {
          status: Number(company.status),
          reason: company.reason ? company.reason : '',
        });
      }
    }
    transaction.commit();
    return true;
  } catch (error) {
    if (transaction) await transaction.rollback();
    throw error;
  }
};

module.exports = UpdateCompaniesStatus;
