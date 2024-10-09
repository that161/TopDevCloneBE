const { DBTypeApplication, DBTypeJob } = require("../../../Domain/utils/const");
const { maskId, unmaskId } = require("../../../Domain/utils/mask");
const { repository } = require("./instance");

const UpdateProcessApplication = async (id, status) => {
    try {
        const idApply = unmaskId(id, DBTypeApplication)
        const result = await repository.updateProcessApplication(idApply, status)
        result.jobId = maskId(result.jobId, DBTypeJob);
        result.id = maskId(result.id, DBTypeApplication);
        return result
    } catch (error) {
        throw error;
    }
};

module.exports = UpdateProcessApplication;
