const { DBError } = require("../../utils/app-errors");
const { EmployerModel } = require("./instance");
const { Op } = require('sequelize');

const listEmployersByCondition = async (condition, limit, offset) => {
    try {
        let inlineCondition = {};
        if (condition !== null) {
            switch (condition.type) {
                case "company_id":
                    inlineCondition = {
                        company_id: condition.value
                    };
                    break;
                case "name":
                    inlineCondition = {
                        name: {
                            [Op.iLike]: `%${condition.value}%`
                        }
                    };
                    break;
                default:
                    break;
            }
        }
        const users = await EmployerModel.findAll({
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
        throw new DBError(error.message, "Something went wrong with user DB");
    }
};

module.exports = listEmployersByCondition;