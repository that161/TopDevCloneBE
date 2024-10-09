const { DBError } = require("../../utils/app-errors");
const { EmployerModel } = require("./instance");

const UpdateEmployer = async (employerId, data) => {
  try {
    /// Find the user
    const user = await EmployerModel.findOne({
      where: {
        id: employerId,
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
    await user.update(data);
    return user.dataValues;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = UpdateEmployer;