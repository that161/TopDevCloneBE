const { DBError } = require("../../utils/app-errors");
const { CandidateModel } = require("./instance");
const { Op } = require('sequelize');

const listCandidatesByCondition = async (condition, limit, offset) => {
    try {
        let inlineCondition = {};
        if (condition !== null) {
            switch (condition.type) {
                case "name":
                    inlineCondition = {
                        fullName: {
                            [Op.iLike]: `%${condition.value}%`
                        }
                    };
                    break;
                default:
                    break;
            }
        }
        const users = await CandidateModel.findAll({
            where: inlineCondition,
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

module.exports = listCandidatesByCondition;
