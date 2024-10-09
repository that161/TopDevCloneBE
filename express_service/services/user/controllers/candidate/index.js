const ListCandidates = require("./list");
const CandidateInfo = require("./info");
const UpdateInfo = require('./update');
const ListCVs = require('./cv_list');
const MainCV = require('./cv_main');
const UploadCV = require('./cv_upload');
const DeleteCV = require('./cv_delete');
const ListCandidatesByCondition = require("./listByCondition");


class CandidateController {
  // [GET] /admin/candidates
  listCandidates = ListCandidates;

  // [GET] /admin/candidates/:id
  candidateInfo = CandidateInfo;

  // [PATCH] /admin/candidates/:id
  updateCandidate = UpdateInfo;

  // [GET] /:id/cvs
  listCVbyUserId = ListCVs;

  // [GET] /:id/main-cv
  mainCV = MainCV;

  // [POST] /upload-cv
  uploadCV = UploadCV;

  // [DELETE] /:id/cvs/:cvId
  deleteCV = DeleteCV;

  // [GET] /admin/candidates/condition
  listCandidatesByCondition = ListCandidatesByCondition;
}

module.exports = CandidateController;