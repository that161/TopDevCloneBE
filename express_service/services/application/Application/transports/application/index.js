const ApplyJob = require("./apply");
const ListApply = require("./listApply");
const ListApplyOfUser = require("./listApplyOfUser");
const DetailApply = require("./detail");
const UpdateProcessApplication = require("./update-process");

class ApplicationTransport {
  applyJob = ApplyJob;
  listApply = ListApply;
  updateProcessApplication = UpdateProcessApplication;
  detailApply = DetailApply;
  listApplyOfUser = ListApplyOfUser;
}

module.exports = ApplicationTransport;
