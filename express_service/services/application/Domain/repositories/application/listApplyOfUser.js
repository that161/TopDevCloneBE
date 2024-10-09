const { DBError } = require("../../utils/app-errors");
const { ApplicationModal } = require("./instance");
const { DBTypeJob, DBTypeApplication } = require("../../utils/const");
const { maskId } = require("../../utils/mask");

const ListApplyOfUser = async (email, limit, page) => {
  try {
    let applications = [];

    applications = await ApplicationModal.findAll({
      where: { email: email },
      limit: limit,
      offset: (page - 1) * limit,
      order: [["createdAt", "DESC"]]
    })

    if (!applications || applications.length === 0) {
      return [];
    }

    const maskedApplications = applications.map((application) => ({
      ...application.toJSON(),
      jobId: maskId(application.jobId, DBTypeJob),
      id: maskId(application.id, DBTypeApplication),
    }));

    return maskedApplications;
  } catch (error) {
    throw new DBError(
      error.message,
      "Something went wrong with get list apply"
    );
  }
};

module.exports = ListApplyOfUser;
