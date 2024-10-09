const { DBError } = require("../../utils/app-errors");
const { ApplicationModal } = require("./instance");

const CountListApplyOfUser = async (email) => {
    try {
        const applications = await ApplicationModal.findAll({
            where: {
                email: email,
            }
        });
        return applications.length;

    } catch (error) {
        throw new DBError(error.message, "Something went wrong with count list apply");
    }
};

module.exports = CountListApplyOfUser;
