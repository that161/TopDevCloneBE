const { STATUS_CODES } = require("../../../Domain/utils/app-errors");
const { ErrorResponse } = require("../../../Domain/utils/error-handler");
const { SetResponse } = require("../../../Domain/utils/success-response");
const { controller } = require("./instance");

const DetailApply = async (req, res, next) => {
    try {
        const id = req.params.id;
        const listApply = await controller.detailApply(id);
        SetResponse(res, STATUS_CODES.OK, listApply, "Successfully", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = DetailApply;
