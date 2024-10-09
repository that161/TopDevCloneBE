const {
  KC_CLIENT_ID,
  KC_CLIENT_SECRET,
  KC_REALM,
  KC_SERVER_URL,
  KC_ADMIN_ROLE,
  KC_ADMIN_ROLE_ID,
  KC_CLIENT_UUID,
  KC_EMPLOYER_ROLE, // for registering admin (but not needed in this case)
} = require('../configuration/keycloak.js');
const { STATUS_CODES } = require('../utils/app-errors');
const { SetResponse } = require('../utils/success-response');
const { ErrorResponse } = require('../utils/error-handler');
const getCredentials = require('../utils/get-credentials');
const getRole = require('../utils/get-role');
const getUser = require('../utils/get-user');
const { getCompaniesStatus, updateCompaniesStatus, rejectHRWithReason } = require('../grpc/client.js');
const { PORT } = require('../configuration/app.js');
const jwt = require('jsonwebtoken');

function paginate(data, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return data.slice(startIndex, endIndex);
}

const adminController = {
  auth: (req, res, next) => {
    // return SetResponse(res, STATUS_CODES.OK, 'Admin authenticated', 'OK', null);
    res.status(200).send('Admin authorized');
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

      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new Error(errorMessage || 'Failed to authenticate');
      }

      // Get credentials
      const credentials = await getCredentials();

      if (!credentials) {
        return ErrorResponse(new Error('Error getting credentials'), res);
      }

      // Check role
      const { access_token, refresh_token, expires_in, refresh_expires_in } = await response.json();
      const roles = await getRole(username, credentials);

      if (!roles || !roles.includes(KC_ADMIN_ROLE)) {
        throw new Error('Unauthorized');
      }

      // Get user info
      const user = await getUser(username, credentials);

      if (!user) {
        throw new Error('Failed to get user info');
      }

      const { firstName, lastName, email } = user;

      const responseData = {
        username,
        firstName,
        lastName,
        email,
        access_token,
        refresh_token,
        expires_in,
        refresh_expires_in,
        role: 'admin',
      };

      // Uncomment if you want to set cookies
      // res.cookie('access_token', access_token, { httpOnly: true });
      // res.cookie('refresh_token', refresh_token, { httpOnly: true });

      return SetResponse(res, STATUS_CODES.OK, responseData, 'OK', null);
    } catch (error) {
      console.error('Error during login:', error);
      return ErrorResponse(error, res);
    }
  },
  loginWithCredentials: async (req, res, next) => {
    try {
      const credentials = await getCredentials();

      if (credentials) {
        return SetResponse(res, STATUS_CODES.OK, credentials, 'OK', null);
      } else {
        return ErrorResponse(new Error('Error getting credentials'), res);
      }
    } catch (error) {
      console.error('Error during loginWithCredentials:', error);
      return ErrorResponse(new Error('Error getting credentials'), res);
    }
  },
  getAccountsHR: async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    const credentials = await getCredentials();

    if (!credentials) {
      return ErrorResponse(new Error('Error getting credentials'), res);
    }

    // call keycloak to get all employer account
    try {
      const response = await fetch(
        `${KC_SERVER_URL}/admin/realms/${KC_REALM}/clients/${KC_CLIENT_UUID}/roles/${KC_EMPLOYER_ROLE}/users`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${credentials.access_token}`,
          },
        },
      );

      if (!response.ok) {
        const { errorMessage } = await response.json();
        throw new Error(errorMessage || 'Failed to get hr accounts');
      }

      let hrAccounts = await response.json();
      console.log('hrAccounts>>>', hrAccounts);
      const hrIds = hrAccounts.map((item) => item.id);
      const listInfo = await getCompaniesStatus({ hrIds });

      let returnData = listInfo?.result?.map((item) => {
        const fullData = hrAccounts.find((hr) => hr.id === item.hrId);
        return {
          ...item,
          addresses: item.addresses || [],
          nationality: item.nationality || [],
          industry: item.industry || [],
          username: fullData?.username,
          email: fullData?.email,
        };
      });

      const pagingData = {
        paging: {
          limit,
          page,
          total: returnData.length,
        },
        data: paginate(returnData, page, limit),
      };

      return SetResponse(res, STATUS_CODES.OK, pagingData, 'OK', null);
    } catch (error) {
      console.error('Error during get hr accounts', error);
      return ErrorResponse(error, res);
    }
  },
  updateStatusHR: async (req, res, next) => {
    let { hrIds, status } = req.body;

    status = Number(status);
    console.log('status>>>', status);

    if (!status || [-1, 0, 1].indexOf(status) === -1) {
      return ErrorResponse(new Error('status must be -1, 0 or 1'), res);
    }

    if (!hrIds.length) {
      return ErrorResponse(new Error('hrIds can not be empty'), res);
    }

    const data = await updateCompaniesStatus({ hrIds, status });
    console.log('data>>>', data);
    if (data.isOk) {
      return SetResponse(res, STATUS_CODES.OK, 'Update status HR successfully', 'OK', null);
    } else {
      return ErrorResponse(new Error('Error during update status HR'), res);
    }
  },

  rejectHR: async (req, res, next) => {
    console.log('rejectHR', req.body);
    let { hrId, reason } = req.body;
    const resp = await rejectHRWithReason({ hrId, reason });
    if (resp.isOk) {
      return SetResponse(res, STATUS_CODES.OK, 'Update status HR successfully', 'OK', null);
    } else {
      return ErrorResponse(new Error('Error during update status HR'), res);
    }
  },

  test: (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    const verifyToken = async (token, role) => {
      try {
        const uri = `${process.env.AUTHENTICATION_HOST}/${role}` || `http://localhost:${PORT}/${role}`;
        const response = await fetch(uri, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = jwt.decode(token);
        console.log(data);

        return {
          status: response.status === 200,
          // userId:
        };
      } catch (error) {
        console.error('Token verification failed:', error.message);
        return false;
      }
    };

    verifyToken(token, 'admin');
  },
};

module.exports = adminController;
