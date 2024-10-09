const express = require('express');
const router = express.Router();
const keycloak = require('../services/keycloak.js');

const { KC_CLIENT_ID, KC_CANDIDATE_ROLE } = require('../configuration/keycloak.js');
const candidateController = require('../controllers/candidateController.js');

// [GET] /auth/candidate
router.get('/', keycloak.protect(`${KC_CLIENT_ID}:${KC_CANDIDATE_ROLE}`), (req, res, next) => {
  return res.status(200).send('Candidate authorized');
});

// User login
router.post('/login', candidateController.login);

// User logout
router.post('/logout', (req, res, next) => {
  // redirect to keycloak logout page
});

// User profile
router.get("/profile",
  //keycloak.protect(`${KC_CLIENT_ID}:${KC_CANDIDATE_ROLE}`),
  candidateController.getInfo
);

// Update user profile
router.patch("/profile",
  //keycloak.protect(`${KC_CLIENT_ID}:${KC_CANDIDATE_ROLE}`),
  candidateController.updateInfo
);

// upload cv
router.post("/upload-cv",
  //keycloak.protect(`${KC_CLIENT_ID}:${KC_CANDIDATE_ROLE}`),
  candidateController.uploadCV
);

// soft delete cv
router.delete("/delete-cv",
  //keycloak.protect(`${KC_CLIENT_ID}:${KC_CANDIDATE_ROLE}`),
  candidateController.deleteCV
);

module.exports = router;
