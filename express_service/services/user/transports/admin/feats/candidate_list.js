const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { candidateController } = require("../instance");

const ListCandidates = async (req, res, next) => {
    try {
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const candidates = await candidateController.listCandidates(limit, offset);
        SetResponse(res, STATUS_CODES.OK, candidates, "OK", { limit: limit, offset: offset });
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListCandidates;
