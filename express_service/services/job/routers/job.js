const express = require(`express`);
const auth = require('../middlewares/auth');
const { JobTransport } = require('../transports');
const jobRouter = express.Router();
const transport = new JobTransport();

jobRouter.get('/list-follow', auth(['candidate']), transport.listFollowOfCandidate);
jobRouter.patch('/:id/unfollowed', auth(['candidate']), transport.unFollow);
jobRouter.patch('/:id/followed', auth(['candidate']), transport.follow);
jobRouter.patch('/update-status', auth(['admin', 'employer']), transport.updateStatus);
jobRouter.get('/', transport.listJobByConditions);
jobRouter.get('/:id', transport.findJob);
jobRouter.patch('/:id', auth(['employer']), transport.updateJob);
jobRouter.post('/', auth(['employer']), transport.createJob);
jobRouter.get('/admin/all', auth(['admin', 'employer']), transport.listAllJob); // example: for admin or employer

module.exports = jobRouter;
