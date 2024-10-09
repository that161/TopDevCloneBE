const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// Implement find job here and export
const FindLatestJobByCompanyId = async (companyId) => {
  try {
    const job = await Job.findOne({
      where: { companyId: companyId },
      order: [['createdAt', 'DESC']], // Order by createdAt descending to get the latest job
    });
    return job ? job.dataValues : null;
  } catch (error) {
    throw new DBError(error.message, 'Something went wrong with job DB');
  }
};

module.exports = FindLatestJobByCompanyId;
