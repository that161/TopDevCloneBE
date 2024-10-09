const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { candidateController } = require("../instance");

const HrGetCandidateInfo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const candidate = await candidateController.candidateInfo(id);
        SetResponse(res, STATUS_CODES.OK, candidate, "OK", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = HrGetCandidateInfo;
