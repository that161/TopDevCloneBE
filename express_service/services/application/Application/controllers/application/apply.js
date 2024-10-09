const { repository } = require("./instance");
const { DBTypeJob, DBTypeApplication } = require("../../../Domain/utils/const");
const { maskId, unmaskId } = require("../../../Domain/utils/mask");

const ApplyJob = async (data) => {
    try {
        data.jobId = unmaskId(data.jobId, DBTypeJob)
        const result = await repository.applyJob(data)
        result.data.jobId = maskId(result.data.jobId, DBTypeJob);
        result.data.id = maskId(result.data.id, DBTypeApplication);

        return { status: result.status, data: result.data };
    } catch {
        throw new Error("JobId not found!");
    }
};

module.exports = ApplyJob;
