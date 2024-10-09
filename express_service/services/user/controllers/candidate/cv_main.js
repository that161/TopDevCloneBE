const { maskId, unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const MainCVs = async (user_id) => {
    try {
        /// Check if the user_id is valid
        let decodedId;
        try {
            decodedId = unmaskId(user_id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        let cvs = await repository.listCVbyUserId(decodedId);
        cvs = cvs.map(cv => ({
            ...cv,
            id: maskId(cv.id, DBTypeUser),
            user_id: maskId(cv.user_id, DBTypeUser)
        }))
        const mainCV = cvs.find(cv => {
            return cv.isMain == true;
        })

        /// If the main CV is not found, throw an error
        if (mainCV === undefined || mainCV === null) {
            throw new BadRequestError("Main CV not found", "May user has no main CV yet!");
        }

        return mainCV;
    } catch (error) {
        throw error;
    }
};

module.exports = MainCVs;