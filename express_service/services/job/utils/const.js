const DBTypeJob = 'job';
const DBTypeCompany = 'company';
const DBTypeUser = 'user';

const COMPANY_STATUS = {
  PENDING: 0,
  DELETED: -1,
  ACTIVE: 1,
};

const JOB_STATUS = {
  PENDING: 'PENDING',
  HIDE: 'HIDE',
  PUBLIC: 'PUBLIC',
  DELETED: 'DELETED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  EXPIRED: 'EXPIRED',
};

const JOB_TYPE = {
  IN_OFFICE: 'IN_OFFICE',
  HYBRID: 'HYBRID',
  REMOTE: 'REMOTE',
  OVERSEA: 'OVERSEA',
};

const CONTRACT_TYPE = {
  FULLTIME: 'FULLTIME',
  FREELANCE: 'FREELANCE',
  PARTIME: 'PARTIME',
};

const SALARY_TYPE = {
  FROM: 'FROM',
  TO: 'TO',
  RANGE: 'RANGE',
  NEGOTIATE: 'NEGOTIATE',
};

const CURRENCY = {
  VND: 'VND',
  USD: 'USD',
};

const USER_ROLE = {
  ADMIN: 'ADMIN',
  HR: 'HR',
  GUEST: 'GUEST',
};

const RABBITMQ_TOPIC = {
  CREATE_JOB: 'create_job',
  CREATE_COMPANY: 'create_company',
};

module.exports = {
  DBTypeJob,
  DBTypeCompany,
  DBTypeUser,
  COMPANY_STATUS,
  JOB_STATUS,
  JOB_TYPE,
  CONTRACT_TYPE,
  SALARY_TYPE,
  USER_ROLE,
  RABBITMQ_TOPIC,
};
