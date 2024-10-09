const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const ListEmployersByCondition = async (req, res, next) => {
    try {
        const condition = req.query.type === undefined ? null : {
            type: req.query.type,
            value: req.query.value || "",
        };
        const limit = req.query.limit || 5;
        const offset = req.query.offset || 0;
        const employers = await employerController.listEmployersByCondition(condition, limit, offset);
        SetResponse(res, STATUS_CODES.OK, employers, "OK", { limit: limit, offset: offset });
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListEmployersByCondition;
