const HrInfo = require('./feats/hr_info');
const HrUpdate = require('./feats/hr_update');
const HrGetCandidateInfo = require('./feats/hr_candidate_info');

class EmployerTransport {
  // [GET] /employer/profile/:id
  hrInfo = HrInfo;

  // [PATCH] /employer/profile/:id
  hrUpdate = HrUpdate;

  // [GET] /employer/candidate/:id
  hrGetCandidateInfo = HrGetCandidateInfo;

}

module.exports = EmployerTransport;
