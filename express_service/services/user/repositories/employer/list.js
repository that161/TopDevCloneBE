const { DBError } = require("../../utils/app-errors");
const { EmployerModel } = require("./instance");

const listEmployers = async (limit, offset) => {
  try {
    const users = await EmployerModel.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    return users ? users.map(user => user.dataValues) : users;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = listEmployers;
