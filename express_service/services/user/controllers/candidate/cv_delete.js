const { unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const DeleteCV = async (id) => {
    try {
        /// Decode the id
        let decodedId;
        try {
            decodedId = unmaskId(id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        const deletedCV = await repository.deleteCV(decodedId);

        /// If the CV is not found, throw an error
        if (deletedCV === null) throw new BadRequestError("CV not found", "CV may not exist!");
        return deletedCV;
    } catch (error) {
        throw error;
    }
};

module.exports = DeleteCV;