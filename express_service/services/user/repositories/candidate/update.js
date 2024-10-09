const { DBError } = require("../../utils/app-errors");
const { CandidateModel } = require("./instance");

const UpdateInfo = async (id, data) => {
  try {
    /// Find the user
    const user = await CandidateModel.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    
    /// If the user is not found, return null
    if (user === null) {
      return null;
    }

    /// Update the user
    user.update(data);
    return user.dataValues;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = UpdateInfo;