const { DBError } = require("../../utils/app-errors");
const { CVModel } = require("./instance");

const listCVs = async (user_id, limit, offset) => {
  try {
    const CVs = await CVModel.findAll({
      where: {
        user_id: user_id,
        archived: false
      },
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
      attributes: {
        exclude: ["archived", "updatedAt"]
      }
    });
    return CVs ? CVs.map(user => user.dataValues) : CVs;
  } catch (error) {
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = listCVs;
