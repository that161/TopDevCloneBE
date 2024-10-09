const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const HrInfo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const hr = await employerController.employerInfo(id);
        SetResponse(res, STATUS_CODES.OK, hr, "OK", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = HrInfo;
