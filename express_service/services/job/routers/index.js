const companyRouter = require('./company');
const jobRouter = require('./job');

module.exports = (app) => {
  app.use('/', jobRouter);
  app.use('/companies', companyRouter);
};
