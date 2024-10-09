const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");

const updateProcessApplication = async (applicationId, status) => {
    try {
        const [updatedRowsCount] = await ApplicationModal.update(
            { status: status },
            { where: { id: applicationId } }
        );

        if (updatedRowsCount === 0) {
            throw new Error("Application not found or already approved");
        }

        const updatedApplication = await ApplicationModal.findByPk(applicationId);
        return updatedApplication.dataValues;
    } catch (error) {
        throw new DBError(error.message, "Something went wrong with updating application");
    }
};

module.exports = updateProcessApplication;
