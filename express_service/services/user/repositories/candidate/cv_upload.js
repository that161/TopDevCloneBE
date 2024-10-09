const { DBError } = require("../../utils/app-errors");
const { CVModel } = require("./instance");

const UploadCV = async (data) => {
  try {
    /// If the CV is main, then set all other CVs to not main
    if (data.isMain === true) {
      await CVModel.update({ "isMain": false }, {
        where: {
          "user_id": data.user_id
        }
      });
      const cv = await CVModel.create(data);
      if (cv === null) return null;
      const { updateAt, archived, ...rest } = cv.dataValues;
      return rest;
    }

    /// If the CV is not main, then check if there is any main CV
    const cvs = await CVModel.findAll({
      where: {
        "user_id": data.user_id
      }
    });
    if (cvs.length === 0) {
      data.isMain = true;
    }
    /// Create the CV
    const cv = await CVModel.create(data);
    if (cv === null) return null;
    const { updatedAt, archived, ...rest } = cv.dataValues;
    return rest;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = UploadCV;