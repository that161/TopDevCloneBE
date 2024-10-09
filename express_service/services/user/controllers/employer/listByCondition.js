const { maskId, unmaskId } = require("../../utils/mask");
const { DBTypeUser, DBTypeCompany } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const ListEmployersByCondition = async (condition, limit, offset) => {
    try {
        // decode necessary fields
        try {
            if (condition !== null && condition.type === "company_id") condition.value = unmaskId(condition.value, DBTypeCompany);
        } catch (error) {
            BadRequestError("Not valid id!", "Require correct id!");
        }
        /// Get the list of employers
        let employers = await repository.listEmployersByCondition(condition, limit, offset);

        /// Format the employers
        employers = employers.map(employer => ({
            ...employer,
            id: maskId(employer.id, DBTypeUser),
            company_id: maskId(employer.company_id, DBTypeCompany),
        }));

        return employers;
    } catch (error) {
        throw error;
    }
};

module.exports = ListEmployersByCondition;