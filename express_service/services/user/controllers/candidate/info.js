const { maskId,unmaskId } = require("../../utils/mask");
const { DBTypeUser } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require("../../utils/app-errors");

const CandidateInfo = async (user_id) => {
    try {
        /// Decode the id
        let decodedId;
        try {
            decodedId = unmaskId(user_id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        const  candidate = await repository.candidateInfo(decodedId);

        /// If the candidate is not found, throw an error
        if(candidate === null) throw new BadRequestError("Candidate not found", "Candidate may not exist!");
        
        /// Format the candidate
        const cvs = await repository.listCVbyUserId(decodedId, null, null);
        const cvsWithoutUserId = cvs.map(({ id ,user_id, createdAt, ...rest }) => ({
            ...rest,
            id: maskId(id, DBTypeUser),
            createdAt: new Date(createdAt).toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })
        }));
        const formatCandidate = {
            ...candidate,
            id: user_id,
            myCVs: cvsWithoutUserId,
        }
        return formatCandidate;
    } catch (error) {
        throw error;
    }
};

module.exports = CandidateInfo;
