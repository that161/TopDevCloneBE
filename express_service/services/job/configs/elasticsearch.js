const ELASTIC_CONFIG = {
  node: process.env.ES_HOST,
  auth: {
    username: process.env.ES_USERNAME,
    password: process.env.ES_PW,
  },
  headers: {
    'Content-Type': 'application/json',
  },
};

module.exports = ELASTIC_CONFIG;
