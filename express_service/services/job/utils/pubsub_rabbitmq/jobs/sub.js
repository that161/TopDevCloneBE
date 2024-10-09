const { subscribeToMessages } = require('../subscriber');
const JobCreateNewJobInElastic = require('./create_new_job_in_elastic');
const { RABBITMQ_TOPIC } = require('../../const');
const JobCreateNewCompanyInElastic = require('./create_company_job_in_elastic');

function StartSubscriber() {
  subscribeToMessages(RABBITMQ_TOPIC.CREATE_JOB, JobCreateNewJobInElastic);
  subscribeToMessages(RABBITMQ_TOPIC.CREATE_COMPANY, JobCreateNewCompanyInElastic);
}

module.exports = StartSubscriber;
