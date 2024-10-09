const { maskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");

const ListCandidatesByCondition = async (condition, limit, offset) => {
    try {
        /// Get list of candidates by condition
        let candidates = await repository.listCandidatesByCondition(condition, limit, offset);
        candidates = await Promise.all(candidates.map(async candidate => {
            const cvs = await repository.listCVbyUserId(candidate.id, null, null);
            const cvsWithoutUserId = cvs.map(({ id ,user_id, createdAt, ...rest }) => ({
                ...rest,
                id: maskId(id, DBTypeUser),
                createdAt: new Date(createdAt).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
            }));
            return {
                ...candidate,
                id: maskId(candidate.id, DBTypeUser),
                myCVs: cvsWithoutUserId,
            };
        }));

        return candidates;
    } catch (error) {
        throw error;
    }
};

module.exports = ListCandidatesByCondition;