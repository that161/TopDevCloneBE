const express = require('express');
const router = express.Router();
const keycloak = require('../services/keycloak.js');

const adminController = require('../controllers/adminController.js');

const { KC_CLIENT_ID, KC_ADMIN_ROLE } = require('../configuration/keycloak.js');

// [GET] /auth/admin
router.get('/', keycloak.protect(`${KC_CLIENT_ID}:${KC_ADMIN_ROLE}`), adminController.auth);
// [POST] /auth/admin/login
router.post('/login', adminController.login);
// [GET] /auth/admin/login
router.get('/login', adminController.loginWithCredentials);

router.get('/accounts/hr', keycloak.protect(`${KC_CLIENT_ID}:${KC_ADMIN_ROLE}`), adminController.getAccountsHR);
router.post(
  '/accounts/hr/status',
  keycloak.protect(`${KC_CLIENT_ID}:${KC_ADMIN_ROLE}`),
  adminController.updateStatusHR,
);
router.post(
  '/accounts/hr/status/reject',
  keycloak.protect(`${KC_CLIENT_ID}:${KC_ADMIN_ROLE}`),
  adminController.rejectHR,
);

//router.get('/test', adminController.test);

module.exports = router;
