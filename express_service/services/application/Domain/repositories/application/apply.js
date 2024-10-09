const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");
const grpcJobClient = require("../../../Infrastructure/grpc/grpc-job-client")

// Implement create application information here and export
const ApplyJob = async (data) => {
  try {
    let application = await ApplicationModal.findOne({
      where: {
        jobId: data.jobId,
        email: data.email
      }
    });

    if (application) {
      await application.update(data)
      return { status: "update", data: application.dataValues }
    } else {
      const newApply = await ApplicationModal.create(data);

      const infoJob = await new Promise((resolve, reject) => {
        grpcJobClient.UpdateApplyCountGrpc({ id: data.jobId }, (error, result) => {
          if (error) {
            console.log(error.message);
            resolve(null);
          } else {
            resolve(result);
          }
        });
      });

      return { status: "create", data: newApply.dataValues }
    }
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, "Something went wrong with apply job");
  }
};

module.exports = ApplyJob;
