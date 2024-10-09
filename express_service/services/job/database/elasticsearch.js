const { Client } = require('@elastic/elasticsearch');
const ELASTIC_CONFIG = require('../configs/elasticsearch');

const elasticClient = new Client(ELASTIC_CONFIG);

async function checkElasticsearchConnection() {
  try {
    // Ping Elasticsearch to check the connection
    const response = await elasticClient.ping();

    if (response.statusCode === 200) {
      console.log('Successfully connected to Elasticsearch');
    } else {
      console.log('Elasticsearch ping returned unexpected status:', response.statusCode);
    }
  } catch (error) {
    console.error('Error connecting to Elasticsearch:', error);
  }
}

// Call the function to check the connection
checkElasticsearchConnection();

module.exports = elasticClient;
