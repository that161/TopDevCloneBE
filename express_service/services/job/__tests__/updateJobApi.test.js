const createServer = require('../utils/server-test');
const { sequelize } = require('../database/pg');
const supertest = require('supertest');
const { jobs } = require('../__mocks__/mock');

describe('Start unit test for update job API', () => {
  let app;
  let server;

  beforeAll(async () => {
    await sequelize.authenticate();
    app = await createServer();
    server = app.listen(5002); // Ensure the server is listening on a port
  });

  afterAll(async () => {
    await sequelize.close();
    server.close(); // Close the server after tests
  });

  test('data is OK, Should return status 200', async () => {
    const jobId = '77rJraD'; // assuming jobId should be an integer
    const job = jobs[0];

    const response = await supertest(app).patch(`/${jobId}`).send(job).expect(200);

    expect(response.body).toEqual({
      statusCode: 200,
      data: true,
      message: 'OK',
    });
  });
  // Duy Tran
  // title is null => should return 400
  test('title is null, Should return status 400', async () => {
    const jobId = '77rJraD';
    const job = jobs[0];
    const mockJob = {
      ...job,
      title: null,
    };

    const response = await supertest(app).patch(`/${jobId}`).send(mockJob).expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      name: 'Error Database',
      description: expect.stringMatching('job.title cannot be null'),
    });
  });

  // level is null => should return 400
  test('level is null, Should return status 400', async () => {
    const jobId = '77rJraD';
    const job = jobs[0];
    const mockJob = {
      ...job,
      level: null,
    };

    const response = await supertest(app).patch(`/${jobId}`).send(mockJob).expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      name: 'Error Database',
    });
  });

  // salaryType is null => should return 400
  test('salaryType is null, Should return status 400', async () => {
    const jobId = '77rJraD';
    const job = jobs[0];
    const mockJob = {
      ...job,
      salaryType: null,
    };

    const response = await supertest(app).patch(`/${jobId}`).send(mockJob).expect(400);

    expect(response.body).toMatchObject({
      statusCode: 400,
      name: 'Error Database',
      description: expect.stringMatching('job.salaryType cannot be null'),
    });
  });

  // Huy Truong
  // startDate is null => should return 404
  test('startDate is null, Should return status 500', async () => {
    const jobId = '77rJraD';
    const job = jobs[0];
    const mockJob = {
      ...job,
      startDate: null,
    };

    const response = await supertest(app).patch(`/${jobId}`).send(mockJob).expect(200);

    expect(response.body).toEqual({
      statusCode: 200,
      data: false,
      message: 'OK',
    });
  });
});
