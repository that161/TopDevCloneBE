const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use('/users', proxy(process.env.BASE_URL_USER_SERVICE));
app.use('/jobs', proxy(process.env.BASE_URL_JOB_SERVICE));
app.use('/applications', proxy(process.env.BASE_URL_APPLICATION_SERVICE));
app.use('/auth', proxy(process.env.BASE_URL_AUTHENTICATION_SERVICE));

app.use('/', (req, res, next) => {
  return res.status(200).json({ msg: 'Hello from GATEWAY!' });
});

app.listen(5000, () => {
  console.log('Gateway is listening to port 5000');
});
