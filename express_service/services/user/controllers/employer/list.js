const { maskId } = require("../../utils/mask");
const { DBTypeUser, DBTypeCompany } = require("../../utils/const");
const { repository } = require("./instance");

const ListEmployers = async (limit, offset) => {
    try {
        /// Get the list of employers
        let employers = await repository.listEmployers(limit, offset);

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

module.exports = ListEmployers;