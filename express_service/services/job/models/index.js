const Job = require('./job');
const Company = require('./company');
const CompanyFollow = require('./companyFollow');
const JobFollow = require('./jobFollow');

async function syncModals() {
  Company.hasMany(Job, { onDelete: 'CASCADE' });
  Job.belongsTo(Company, { onDelete: 'CASCADE' });

  /* await Company.sync({ alter: true });
  await Job.sync({ alter: true });
  await CompanyFollow.sync({ alter: true });
  await JobFollow.sync({ alter: true }); */
}

module.exports = { syncModals };
