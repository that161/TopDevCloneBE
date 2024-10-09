const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const updateEmployerApprovalStatus = async (req, res, next) => {
    try {
        const list_id = req.body.ids;
        const status = req.body.isApproved === true ? 1 : -1;

        const successfulUpdates = [];
        const failedUpdates = [];

        for (const id of list_id) {
            try {
                // Update employer status
                await employerController.updateEmployer(id, { status: status });
                successfulUpdates.push(id);
            } catch (error) {
                // Add failed updates to the list
                failedUpdates.push(id);
            }
        }
        if (failedUpdates.length === 0) {
            SetResponse(res, STATUS_CODES.OK, { allSuccess: true }, "OK");
        }
        else {
            SetResponse(res, STATUS_CODES.OK, { allSuccess: false ,success: successfulUpdates, fail: failedUpdates }, "OK");
        }
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = updateEmployerApprovalStatus;