const ListCandidates = require('./feats/candidate_list');
const CandidateInfo = require('./feats/candidate_info');
const ListCandidatesByCondition = require('./feats/candidate_listByCondition');
const ListEmployers = require("./feats/employer_list");
const EmployerInfo = require("./feats/employer_info");
const UpdateEmployer = require('./feats/employer_update');
const UpdateHRStatus = require('./feats/employer_approvalStatus');
const UpdateManyHRStatus = require('./feats/employers_approvalStatus');
const ListEmployersByCondition = require('./feats/employer_listByCondition');



class AdminTransport {
  /////////////////////////////// CANDIDATE /////////////////////////////////
  // [GET] /admin/candidates
  listCandidates = ListCandidates;

  // [GET] /admin/candidates/:id
  candidateInfo = CandidateInfo;

  // [GET] /admin/candidates/condition
  listCandidatesByCondition = ListCandidatesByCondition;

  /////////////////////////////// EMPLOYER /////////////////////////////////

  // [GET] /admin/employers
  listEmployers = ListEmployers;

  // [GET] /admin/employers/:id
  employerInfo = EmployerInfo;

  // [PATCH] /admin/employers/:id
  updateEmployer = UpdateEmployer;

  // [PATCH] /admin/employers/updateHRstatus
  updateHRStatus = UpdateHRStatus;

  // [PATCH] /admin/employers/updateManyHRstatus
  updateManyHRStatus = UpdateManyHRStatus;

  // [GET] /admin/employers/condition
  listEmployersByCondition = ListEmployersByCondition;

  /////////////////////////////// END /////////////////////////////////
}

module.exports = AdminTransport;
