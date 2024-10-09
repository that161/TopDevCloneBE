const { DBError } = require("../../utils/app-errors");
const { CVModel } = require("./instance");

const deleteCV = async (id) => {
  try {
    /// Find the CV
    const cv = await CVModel.findOne({
      where: {
        id: id
      }
    });
    /// If the CV is not found, return null
    if (cv === null) {
      return null;
    }

    /// Update the CV
    await cv.update(
      {
        archived: true
      }
    );
    return cv.dataValues;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = deleteCV;
