const ListEmployers = require("./list");
const ListEmployersByCondition = require('./listByCondition');
const EmployerInfo = require("./info");
const UpdateEmployer = require('./update');


class AdminRepository {
    // [GET] /admin/employers
    listEmployers = ListEmployers;

    // [GET] /admin/employers/condition
    listEmployersByCondition = ListEmployersByCondition;

    // [GET] /admin/employers/:id
    employerInfo = EmployerInfo;

    // [PATCH] /admin/employers/:id
    updateEmployer = UpdateEmployer;

}

module.exports = AdminRepository;
