const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { employerController } = require("../instance");

const UpdateEmployer = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const employer = await employerController.updateEmployer(id, data);
        SetResponse(res, STATUS_CODES.OK, employer, "OK", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = UpdateEmployer;