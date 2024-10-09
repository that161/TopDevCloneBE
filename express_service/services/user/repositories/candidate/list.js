const { DBError } = require("../../utils/app-errors");
const { CandidateModel } = require("./instance");

const listCandidates = async (limit, offset) => {
  try {
    const users = await CandidateModel.findAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"], ["updatedAt", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    });
    return users ? users.map(user => user.dataValues) : users;
  } catch (error) {
    console.log(error);
    throw new DBError(error.message, "Something went wrong with user DB");
  }
};

module.exports = listCandidates;
