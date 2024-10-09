const { DBError } = require("../.././utils/app-errors");
const { ApplicationModal } = require("./instance");
const { maskId } = require("../.././utils/mask");

const DetailApply = async (id) => {
    try {
        const application = await ApplicationModal.findOne({
            where: { id: id }
        });

        return application.dataValues;

    } catch (error) {
        throw new DBError(error.message, "Something went wrong with get detail apply");
    }
};

module.exports = DetailApply;
