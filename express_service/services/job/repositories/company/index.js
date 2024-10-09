const CreateCompany = require('./create');
const FindCompanyById = require('./find');
const ListJobsByCompanyId = require('./listJobs');
const UpdateCompany = require('./update');
const ListCompanySlider = require('./slider');
const GetSearchConditions = require('./searchConditions');
const CountCompanyByConditions = require('./count');
const FilterCompanyByConditions = require('./filter');
const CreateCompanyWithSharding = require('./createCompanySharding');
const FindCompanyByIdWithSharding = require('./findCompanySharding');
const FilterCompanyWithSharding = require('./filterCompanySharding');
const GetSearchConditionListJob = require('./searchConditionListJob');
const IncreaseFollowedCount = require('./increaseFollowCount');
const GetTopCompaniesWithMostJobs = require('./getListCompanyWithMostJob');
const GetTopCompaniesWithRecentJobs = require('./getListCompanyWithLatestJob');
const FindCompanyByName = require('./findByName');
const UpdateCompanyByHrId = require('./updateByHrId');
const GetInfoCompany = require('./getInfo');
const UpdateViewedCompany = require('./updateViewed');
const FindCompanyByHrId = require('./findByHrId');
const { CreateFollow, DeleteFollow, FindALlByUserId, CountAll } = require('./follow');
const DecreaseFollowedCount = require('./decreaseFollowCount');
class CompanyRepository {
  // [GET] /companies/:id/jobs
  listJobsByCompanyId = ListJobsByCompanyId;

  // [GET] /companies/:id
  findCompanyById = FindCompanyById;
  // [GET] /companies/info
  getInfoCompany = GetInfoCompany;

  // [POST] /companies
  createCompany = CreateCompany;

  // [PATCH] /companies/:id
  updateCompany = UpdateCompany;
  updateViewedCompany = UpdateViewedCompany;

  // [GET] /companies/slider
  listCompanySlider = ListCompanySlider;

  getSearchCondition = GetSearchConditions;

  countCompanyByConditions = CountCompanyByConditions;

  filterCompanyByConditions = FilterCompanyByConditions;

  // [POST] /companies/create
  createCompanyWithSharding = CreateCompanyWithSharding;
  //
  findCompanyByIdWithSharding = FindCompanyByIdWithSharding;
  //
  filterCompanyWithSharding = FilterCompanyWithSharding;

  getSearchConditionListJob = GetSearchConditionListJob;

  // follow company
  increaseFollowedCount = IncreaseFollowedCount;
  decreaseFollowedCount = DecreaseFollowedCount;

  getTopCompaniesWithMostJobs = GetTopCompaniesWithMostJobs;

  getTopCompaniesWithRecentJobs = GetTopCompaniesWithRecentJobs;

  findByName = FindCompanyByName;

  updateByHrId = UpdateCompanyByHrId;

  findCompanyByHrId = FindCompanyByHrId;

  createFollower = CreateFollow;

  deleteFollow = DeleteFollow;

  findAllFollowByUserId = FindALlByUserId;

  CountAllFollow = CountAll;
}

module.exports = CompanyRepository;
