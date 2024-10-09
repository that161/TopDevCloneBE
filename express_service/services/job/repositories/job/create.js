const { DBError } = require('../../utils/app-errors');
const { Job } = require('./instance');

// Implement create job information here and export
const CreateJob = async (data) => {
  try {
    // Create a new job with the provided data
    const newJob = await Job.create(data);

    // Return the newly created job data
    return newJob.dataValues;
  } catch (error) {
    // If an error occurs, throw a DBError
    throw new DBError(error.message, 'Something went wrong with job creation');
  }
};

module.exports = CreateJob;
