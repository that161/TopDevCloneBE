const { DBTypeJob, DBTypeApplication } = require("../../../Domain/utils/const");
const { unmaskId, maskId } = require("../../../Domain/utils/mask");
const { repository } = require("./instance");
const grpcJobClient = require("../../../Infrastructure/grpc/grpc-job-client")

const DetailApply = async (id) => {
    try {
        const idApply = unmaskId(id, DBTypeApplication)
        const result = await repository.detailApply(idApply)

        const infoJob = await new Promise((resolve, reject) => {
            grpcJobClient.GetJobInformation({ id: result.jobId }, (error, result) => {
                if (error) {
                    console.log(error.message);
                    resolve(null);
                } else {
                    resolve(result);
                }
            });
        });

        result.jobDetail = {
            jobId: maskId(result.jobId, DBTypeJob),
            title: infoJob.title,
            level: infoJob.level,
            jobType: infoJob.jobType,
            endDate: infoJob.endDate
        };


        result.id = maskId(result.id, DBTypeApplication);
        result.jobId = maskId(result.jobId, DBTypeJob);
        return result
    } catch (error) {
        throw error;
    }
};

module.exports = DetailApply;
