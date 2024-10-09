const ListEmployers = require("./list");
const EmployerInfo = require("./info");
const UpdateEmployer = require('./update');
const ListEmployersByCondition = require('./listByCondition');

class EmployerController {
  // [GET] /admin/employers
  listEmployers = ListEmployers;

  // [GET] /admin/employers/:id
  employerInfo = EmployerInfo;

  // [PATCH] /admin/employers/:id
  updateEmployer = UpdateEmployer;

  // [GET] /admin/employers/condition
  listEmployersByCondition = ListEmployersByCondition;
}

module.exports = EmployerController;