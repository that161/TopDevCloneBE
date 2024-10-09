const { unmaskId, maskId } = require("../../utils/mask");
const { DBTypeUser, DBTypeCompany } = require("../../utils/const");
const { repository } = require("./instance");
const { BadRequestError } = require('../../utils/app-errors');

const UpdateEmployer = async (employerId, data) => {
    try {
        /// Check if the data is valid
        const notValidField = ["id", "createdAt", "updatedAt"];
        if (Object.keys(data).some((key) => notValidField.includes(key))) {
            throw new BadRequestError("Invalid field!", "Invalid field to update (id, createdAt, updatedAt)");
        }
        
        /// Decode the id
        let decodedId;
        try {
            decodedId = unmaskId(employerId, DBTypeUser);
        } catch (error) {
            throw new BadRequestError("Not valid id!", "Require correct id!");
        }
        const employer = await repository.updateEmployer(decodedId, data);
        
        /// If the employer is not found, throw an error
        if (employer === null) {
            throw new BadRequestError("Employer not found!", "Employer not found");
        }

        /// Format the employer
        const formatEmployer = {
            ...employer,
            id: employerId,
            company_id: maskId(employer.company_id, DBTypeCompany),
        }
        return formatEmployer;
    } catch (error) {
        throw error;
    }
};

module.exports = UpdateEmployer;
