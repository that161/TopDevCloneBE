const FormatJob = (job) => {
  try {
    const formattedJob = { ...job }; // Create a copy of the job object

    formattedJob.technicals = job && job.technicals ? job.technicals.split('|') : [];
    formattedJob.level = job && job.level ? job.level.split('|') : [];

    return formattedJob; // Return the formatted job
  } catch (error) {/* 
    console.log(error.message); */
    return job; // Return the original job object if there's an error
  }
};

const FormatCompany = (company) => {
  try {
    const formattedCompany = { ...company }; // Create a copy of the job object

    // Parse each property and assign the parsed value back to the copyz
    formattedCompany.skills = JSON.parse(company.skills);
    formattedCompany.nations = JSON.parse(company.nations);
    formattedCompany.benefits = JSON.parse(company.benefits);
    formattedCompany.fields = JSON.parse(company.fields);
    formattedCompany.images = JSON.parse(company.images);

    return formattedCompany; // Return the formatted job
  } catch (error) {/* 
    console.log(error.message); */
    return company; // Return the original job object if there's an error
  }
};

module.exports = { FormatJob, FormatCompany };
