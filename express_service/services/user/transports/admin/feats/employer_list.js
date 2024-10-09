const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const ListEmployers = async (req, res, next) => {
    try {
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const employers = await employerController.listEmployers(limit, offset);
        SetResponse(res, STATUS_CODES.OK, employers, "OK", { limit: limit, offset: offset });
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListEmployers;
