const Application = require('./application');

async function syncModals() {
    await Application.sync({ alter: true });
}

module.exports = syncModals;