const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const EmployerInfo = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employer = await employerController.employerInfo(id);
        SetResponse(res, STATUS_CODES.OK, employer, "OK", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = EmployerInfo;
