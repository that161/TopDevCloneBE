const { maskId, unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const UploadCV = async (data) => {
    try {
        /// Decode the id
        try {
            data.user_id = unmaskId(data.user_id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        let cv = await repository.uploadCV(data);
        /// format the cv
        cv = {
            ...cv,
            id: maskId(cv.id, DBTypeUser),
            user_id: maskId(cv.user_id, DBTypeUser),
        }
        return cv;
    } catch (error) {
        throw error;
    }
};

module.exports = UploadCV;
