const { JobRepository } = require('../repositories');
const { DBError } = require('../utils/app-errors');
const { sequelize } = require('../database/pg');
const { jobs } = require('../__mocks__/mock');

describe('Start unit test for update job function', () => {
  // Run one-time
  let jobRepository;
  beforeAll(async () => {
    await sequelize.authenticate();

    jobRepository = new JobRepository();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('Test Updated function()', () => {
    test('data is OK, Should return 1', async () => {
      const jobId = 6;
      const job = jobs[0];

      const result = await jobRepository.updateJobById(jobId, job);
      expect(result).toEqual(true);
    });
    test('Id is undefine, Should return false', async () => {
      const jobId = undefined;
      const job = jobs[0];

      const result = await jobRepository.updateJobById(jobId, job);
      expect(result).toEqual(false);
    });

    // Hai
    test('Id is null, Should return false', async () => {
      const jobId = null;
      const job = jobs[0];

      const result = await jobRepository.updateJobById(jobId, job);
      expect(result).toEqual(false);
    });

    test('Id is not found(not in db), Should return false', async () => {
      const jobId = 999;
      const job = jobs[0];

      const result = await jobRepository.updateJobById(jobId, job);
      expect(result).toEqual(false);
    });

    // Duy Tran
    test('title is null, should throw DBError', async () => {
      const jobId = 6;
      const job = jobs[0];
      const mockJob = {
        ...job,
        title: null,
      };

      await expect(jobRepository.updateJobById(jobId, mockJob)).rejects.toThrow(DBError);
    });

    test('level is null, should throw DBError', async () => {
      const jobId = 6;
      const job = jobs[0];
      const mockJob = {
        ...job,
        level: null,
      };

      await expect(jobRepository.updateJobById(jobId, mockJob)).rejects.toThrow(DBError);
    });

    test('salaryType is null, should throw DBError', async () => {
      const jobId = 6;
      const job = jobs[0];
      const mockJob = {
        ...job,
        salaryType: null,
      };

      await expect(jobRepository.updateJobById(jobId, mockJob)).rejects.toThrow(DBError);
    });

    // Huy Truong
    // startDate is null => should return 404
    test('startDate is null, Should return false', async () => {
      const jobId = 6;
      const job = jobs[0];
      const mockJob = {
        ...job,
        startDate: null,
      };
      const result = await jobRepository.updateJobById(jobId, mockJob);
      expect(result).toEqual(false);
    });
    // is OK
    // Id job is undefined => should return 403
    // Id job is null => should return 403
    // Id Job is not found => expect return 404
    // title is null
    // title is undefined => should return 404
    // level is null => should return 404
    // level is undefined => should return 404
    // salaryType is null => should return 404
    // salaryType is undefined => should return 404
    // startDate is null => should return 404
    // startDate is undefined => should return 404
    // endDate is null => should return 404
    // endDate is undefined => should return 404
    // status is null => should return 404
    // status is undefined => should return 404
  });
});
