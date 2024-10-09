const { unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require("../../utils/app-errors");

const UpdateInfo = async (id, data) => {
    try {
        /// Check if the data is valid
        const notValidField = ["id", "email", "createdAt", "updatedAt"];
        if (Object.keys(data).some((key) => notValidField.includes(key))) {
            throw new BadRequestError("Invalid field!", "Invalid field to update (id, email, createdAt, updatedAt)");
        }
        /// Decode the id
        let decodedId;
        try {
            decodedId = unmaskId(id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        const user = await repository.updateCandidate(decodedId, data);

        /// If the user is not found, throw an error
        if (user === null)  throw new BadRequestError("Not found!", "User not found!");

        /// Format the user
        const formatUser = {
            ...user,
            id: id,
        }
        return formatUser;
    } catch (error) {
        throw error;
    }
};

module.exports = UpdateInfo;
