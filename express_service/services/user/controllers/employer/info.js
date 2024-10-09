const { unmaskId, maskId } = require("../../utils/mask");
const { DBTypeUser, DBTypeCompany } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const EmployerInfo = async (id) => {
    try {
        /// Decode the id
        let decodedId;
        try {
            decodedId = unmaskId(id, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        const employer = await repository.employerInfo(decodedId);

        /// If the employer is not found, throw an error
        if (employer === null) throw new BadRequestError("Employer not found!", "Employer may not exist!");
        
        /// Format the employer
        const formatEmployer = {
            ...employer,
            id: id,
            company_id: maskId(employer.company_id, DBTypeCompany),
        }
        return formatEmployer;
    } catch (error) {
        throw error;
    }
};

module.exports = EmployerInfo;
