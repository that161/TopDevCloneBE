const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");

const CountListApply = async (id, status) => {
    try {
        let applications = [];
        if (status == "") {
            applications = await ApplicationModal.findAll({
                where: {
                    jobId: id,
                }
            });
        }
        else {
            applications = await ApplicationModal.findAll({
                where: {
                    jobId: id,
                    status: status
                }
            });
        }
        return applications.length;

    } catch (error) {
        throw new DBError(error.message, "Something went wrong with count list apply");
    }
};

module.exports = CountListApply;
