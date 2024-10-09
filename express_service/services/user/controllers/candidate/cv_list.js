const { maskId, unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const ListCVs = async (user_id, limit, offset) => {
    try {
        /// Check if the user_id is valid
        let decodedId;
        try {
            decodedId = unmaskId(user_id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        let cvs = await repository.listCVbyUserId(decodedId, limit, offset);
        cvs = cvs.map(cv => ({
            ...cv,
            id: maskId(cv.id, DBTypeUser),
            user_id: maskId(cv.user_id, DBTypeUser)
        }))

        return cvs;
    } catch (error) {
        throw error;
    }
};

module.exports = ListCVs;