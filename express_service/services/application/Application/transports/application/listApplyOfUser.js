const { STATUS_CODES } = require("../../../Domain/utils/app-errors");
const { ErrorResponse } = require("../../../Domain/utils/error-handler");
const { SetResponse } = require("../../../Domain/utils/success-response");
const { controller } = require("./instance");

const ListApplyOfUser = async (req, res, next) => {
    try {
        const email = req.user.email;
        const { page, limit } = req.query
        const listApply = await controller.listApplyOfUser(email, parseInt(limit), parseInt(page));
        SetResponse(res, STATUS_CODES.OK, listApply, "Successfully", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = ListApplyOfUser;