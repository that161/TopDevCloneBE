const { elasticClient } = require('./instance');

async function JobCreateNewJobInElastic(message) {
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

module.exports = JobCreateNewJobInElastic;
