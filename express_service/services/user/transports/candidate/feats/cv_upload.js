const { STATUS_CODES } = require("../../../utils/app-errors");
const { ErrorResponse } = require("../../../utils/error-handler");
const { SetResponse } = require("../../../utils/success-response");
const { candidateController } = require("../instance");

const UploadCV = async (req, res, next) => {
    try {
        const data = {
            user_id: req.body.user_id,
            name: req.body.name,
            link: req.body.link,
            isMain: req.body.is_main !== undefined ? req.body.is_main : true,
            //changeable: false,
            archived: false,
            
        }
        const CV = await candidateController.uploadCV(data);
        SetResponse(res, STATUS_CODES.OK, CV, "OK", null);
    } catch (error) {
        ErrorResponse(error, res);
    }
};

module.exports = UploadCV;
