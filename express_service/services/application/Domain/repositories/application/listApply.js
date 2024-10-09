const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");
const { DBTypeJob, DBTypeApplication } = require("../.././utils/const");
const { maskId } = require("../.././utils/mask");
const { redisClient, getCacheRedis, setCacheRedis } = require("../../../Infrastructure/redis");

const ListApply = async (id, status, limit, page) => {
  try {
    let applications = [];
    const cachedApplications = await getCacheRedis(
      `applications:${id}:${limit}:${page}`
    );

    if (cachedApplications) {
      console.log("data is cached, not request to db");
      applications = cachedApplications;
    } else {
      console.log("invalid cachedApplications, start caching");
      if (status == "") {
        applications = await ApplicationModal.findAll({
          where: {
            jobId: id
          },
          limit: limit,
          offset: (page - 1) * limit,
          order: [["createdAt", "DESC"]],
        });
      }
      else {
        applications = await ApplicationModal.findAll({
          where: {
            jobId: id,
            status: status
          },
          limit: limit,
          offset: (page - 1) * limit,
          order: [["createdAt", "DESC"]],
        });
      }

      await setCacheRedis(`applications:${id}:${limit}:${page}`, applications);
    }

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

module.exports = ListApply;
