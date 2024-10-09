const { elasticClient } = require('./instance');

async function JobCreateNewCompanyInElastic(message) {
  try {
    const data = message.message;

    await elasticClient.index({
      index: 'jobs',
      id: data.id,
      body: data,
    });
  } catch (error) {
    console.log('error: ', error);
  }
}

module.exports = JobCreateNewCompanyInElastic;
