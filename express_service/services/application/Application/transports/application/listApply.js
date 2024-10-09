const { STATUS_CODES } = require("../../../Domain/utils/app-errors");
const { ErrorResponse } = require("../../../Domain/utils/error-handler");
const { SetResponse } = require("../../../Domain/utils/success-response");
const { controller } = require("./instance");

const ListApply = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { page, limit, status } = req.query
        const listApply = await controller.listApply(id, status, parseInt(limit), parseInt(page));
        SetResponse(res, STATUS_CODES.OK, listApply, "Successfully", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListApply;
