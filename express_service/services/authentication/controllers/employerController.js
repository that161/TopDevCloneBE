const {
  KC_CLIENT_ID,
  KC_CLIENT_SECRET,
  KC_REALM,
  KC_SERVER_URL,
  KC_EMPLOYER_ROLE_ID,
  KC_EMPLOYER_ROLE,
} = require('../configuration/keycloak.js');
const { STATUS_CODES } = require('../utils/app-errors');
const { SetResponse } = require('../utils/success-response');
const { ErrorResponse } = require('../utils/error-handler');
const getCredentials = require('../utils/get-credentials');
const setRole = require('../utils/set-role');
const getRole = require('../utils/get-role');
const getUser = require('../utils/get-user');
const { createCompany, getCompanyStatus } = require('../grpc/client');

const employerController = {
  auth: (req, res, next) => {
    res.status(200).send({ data: 'Employer authorized' });
  },

  login: async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return ErrorResponse(new Error('Username and password are required'), res);
    }

    try {
      const response = await fetch(`${KC_SERVER_URL}/realms/${KC_REALM}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'password',
          username,
          password,
          client_id: KC_CLIENT_ID,
          client_secret: KC_CLIENT_SECRET,
        }),
      });

      if (response.status === 401) {
        return ErrorResponse(new Error('Invalid username or password'), res);
      } else if (!response.ok) {
        const { errorMessage } = await response.json();
        return ErrorResponse(new Error(errorMessage), res);
      }

      // Get credentials
      const credentials = await getCredentials();

      if (!credentials) {
        return ErrorResponse(new Error('Error getting credentials'), res);
      }

      // Check role
      const { access_token, refresh_token, expires_in, refresh_expires_in } = await response.json();
      const roles = await getRole(username, credentials);

      console.log(access_token);

      if (!roles || !roles.includes(KC_EMPLOYER_ROLE)) {
        return ErrorResponse(new Error('Unauthorized'), res);
      }

      // Get user info
      const user = await getUser(username, credentials);

      if (!user) {
        throw new Error('Failed to get user info');
      }

      const { id, firstName, lastName, email } = user;

      // Check status
      const companyStatus = await getCompanyStatus(id);

      if (companyStatus.status !== 1) {
        return ErrorResponse(new Error('Account is not active'), res);
      }

      const responseData = {
        id,
        username,
        firstName,
        lastName,
        email,
        access_token,
        refresh_token,
        expires_in,
        refresh_expires_in,
        role: 'employer',
      };

      return SetResponse(res, STATUS_CODES.OK, responseData, 'OK', null);
    } catch (error) {
      console.error('Error during login:', error);
      return ErrorResponse(error, res);
    }
  },

  register: async (req, res, next) => {
    const {
      username: _username,
      password: _password,
      email: _email,
      firstName: _firstName,
      lastName: _lastName,
      companyName: _companyName,
      phoneNumber: _phoneNumber,
    } = req.body;

    if (!_username || !_password || !_email || !_firstName || !_lastName || !_companyName || !_phoneNumber) {
      return ErrorResponse(
        new Error(
          'All fields are required: username, password, email, first name, last name, company name, phone number',
        ),
        res,
      );
    }

    try {
      // Get access token using client credentials
      const credentials = await getCredentials();

      if (!credentials) {
        return ErrorResponse(new Error('Error getting credentials'), res);
      }

      const responseRegister = await fetch(`${KC_SERVER_URL}/admin/realms/${KC_REALM}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials.access_token}`,
        },
        body: JSON.stringify({
          username: _username,
          email: _email,
          firstName: _firstName,
          lastName: _lastName,
          enabled: true,
          emailVerified: false,
          credentials: [
            {
              type: 'password',
              value: _password,
              temporary: false,
            },
          ],
        }),
      });

      if (!responseRegister.ok) {
        const { errorMessage } = await responseRegister.json();
        return ErrorResponse(new Error(errorMessage), res);
      }

      // Set role
      const responseRole = await setRole(_username, KC_EMPLOYER_ROLE_ID, KC_EMPLOYER_ROLE, credentials);

      if (!responseRole) {
        return ErrorResponse(new Error('Failed to set role'), res);
      }

      // Get user info
      const user = await getUser(_username, credentials);

      if (!user) {
        throw new Error('Failed to get user info');
      }

      const { id } = user;

      const responseCompany = await createCompany(id, _companyName, _phoneNumber);

      if (!responseCompany) {
        return ErrorResponse(new Error('Failed to create company'), res);
      }

      return SetResponse(res, STATUS_CODES.OK, {}, 'OK', null);
    } catch (error) {
      console.error('Error during registration:', error);
      return ErrorResponse(error, res);
    }
  },
};

module.exports = employerController;
