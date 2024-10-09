const CreateJob = require('./create');
const FindJob = require('./find');
const UpdateJob = require('./update');
const ListJobByConditions = require('./list');
const ListAllJob = require('./listAll');
const UpdateStatus = require('./updateStatus');
const Follow = require('./follow');
const UnFollow = require('./unFollow');
const ListFollowOfCandidate = require('./followOfUser');
class JobTransport {
  // [GET] /jobs?keywords=???&level=???&type=???&typeContract=???&address=???&page=??&limit=??&cursor=???&keywords=???
  listJobByConditions = ListJobByConditions;

  // [GET] /jobs/:id
  findJob = FindJob;

  // [PATCH] /jobs/:id
  updateJob = UpdateJob;

  //[POST] /jobs
  createJob = CreateJob;

  // [GET] /jobs/admin
  listAllJob = ListAllJob;

  // [PATCH] jobs/change-status
  updateStatus = UpdateStatus;

  follow = Follow;

  unFollow = UnFollow;

  listFollowOfCandidate = ListFollowOfCandidate;
}

module.exports = JobTransport;
