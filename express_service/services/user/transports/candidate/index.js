const CandidateInfo = require('./feats/candidate_info');
const UpdateCandidate = require('./feats/candidate_update');
const ListCVs = require('./feats/cv_list');
const MainCV = require('./feats/cv_main');
const UploadCV = require('./feats/cv_upload');
const CreateCV = require('./feats/cv_create');
const DeleteCV = require('./feats/cv_delete');

class CandidateTransport {
  // [GET] /profile/:id
  candidateInfo = CandidateInfo;
  
  // [PATCH] /profile/:id
  updateCandidate = UpdateCandidate;

  // [GET] /:id/cvs
  listCVbyUserId = ListCVs;

  // [GET] /:id/main-cv
  mainCV = MainCV;

  // [POST] /upload-cv
  uploadCV = UploadCV;

  // [POST] /create-cv
  createCV = CreateCV;

  // [DELETE] /:id/cvs/:cvId
  deleteCV = DeleteCV;

}

module.exports = CandidateTransport;
