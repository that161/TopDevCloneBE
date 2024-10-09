const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const updateEmployerApprovalStatus = async (req, res, next) => {
    try {
        const id = req.body.id;
        const status = req.body.isApproved === true ? 1 : -1;
        const hr = await employerController.updateEmployer(id, { status: status });
        SetResponse(res, STATUS_CODES.OK, hr, "OK");
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = updateEmployerApprovalStatus;