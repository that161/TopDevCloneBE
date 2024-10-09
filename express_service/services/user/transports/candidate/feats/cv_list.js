const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { candidateController } = require("../instance");

const ListCVs = async (req, res, next) => {
    try {
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const id = req.params.id;
        const CVs = await candidateController.listCVbyUserId(id, limit, offset);
        SetResponse(res, STATUS_CODES.OK, CVs, "OK", { limit: limit, offset: offset });
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListCVs;
