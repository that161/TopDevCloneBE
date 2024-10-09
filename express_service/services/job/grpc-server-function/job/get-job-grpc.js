const { repository, companyRepository } = require('./instance');
const { DBTypeJob, DBTypeCompany, DBTypeUser } = require('../../utils/const');
const { FormatJob } = require('../../utils/format-result');
const { maskId } = require('../../utils/mask');

const GetJobInformation = async (call, callback) => {
    try {
        const id = call.request.id;
        let job = await repository.findJobById(id);
        // implement search company here
        job.company = await companyRepository.findCompanyById(job.companyId);

        job.id = maskId(job.id, DBTypeJob);
        job.companyName = job.company.name

        // format data return
        job = FormatJob(job);

        callback(null, job);
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = { GetJobInformation };