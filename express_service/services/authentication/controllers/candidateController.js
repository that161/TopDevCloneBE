const {
  KC_CLIENT_ID,
  KC_CLIENT_SECRET,
  KC_SERVER_URL,
  KC_REALM,
  KC_CANDIDATE_ROLE_ID,
  KC_CANDIDATE_ROLE,
} = require('../configuration/keycloak');
const { STATUS_CODES } = require('../utils/app-errors');
const { ErrorResponse } = require('../utils/error-handler');
const getCredentials = require('../utils/get-credentials');
const getUser = require('../utils/get-user');
const setRole = require('../utils/set-role');
const { SetResponse } = require('../utils/success-response');
const { UnauthorizeError } = require('../utils/app-errors');
const CandidateModel = require('../models/candidate');
const CVModel = require('../models/cv');
const jwt = require('jsonwebtoken');
const { maskId, unmaskId } = require('../utils/mask');
const { DBTypeUser } = require('../utils/const');

function parseQueryString(queryString) {
  // Split the query string by '&'
  const pairs = queryString.split('&');

  // Initialize an empty object to hold the parsed key-value pairs
  const result = {};

  // Iterate through each pair
  pairs.forEach((pair) => {
    // Split each pair by '=' to get the key and value
    const [key, value] = pair.split('=');

    // Decode the URI components and assign them to the result object
    result[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return result;
}

const keycloakCreateUserAndLogin = async (data) => {
  // given_name === firstName, family_name === lastName. 2 keys is retuned from google
  // user email for google login, initUserName for github login
  let { email, given_name, family_name, initUserName } = data;
  if (!given_name && !family_name) {
    return {
      error: {
        message: 'All fields are required: first name, last name',
      },
    };
  }

  if (given_name && !family_name) {
    family_name = given_name.split(' ')[0];
    given_name = given_name.split(' ').slice(1).join(' ');
  }

  if (!email && !initUserName) {
    return {
      error: {
        message: 'Email or username is required',
      },
    };
  }

  let inUsedUsername;

  if (initUserName) {
    // because github api can not get email if email is not public, so we need to create a fake email here to create account in keycloak
    // if not have email, account is still created but can not login
    inUsedUsername = initUserName;
    email = initUserName + '@github.com';
  } else {
    inUsedUsername = email;
  }

  const credentials = await getCredentials();

  // 1. check existed user in keycloak
  let createdUser = await getUser(inUsedUsername, credentials);
  let isNewUser = false;

  if (!createdUser) {
    // 2.1 user is not existed in keycloak, create a new one, assign to createdUser
    // 2.1.0 create account in keycloak
    isNewUser = true;
    const responseRegister = await fetch(`${KC_SERVER_URL}/admin/realms/${KC_REALM}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials.access_token}`,
      },
      body: JSON.stringify({
        username: inUsedUsername,
        email,
        firstName: given_name,
        lastName: family_name,
        enabled: true,
        emailVerified: false,
        credentials: [
          {
            type: 'password',
            value: process.env.KEYCLOAK_DEFAULT_USER_PASSWORD,
            temporary: false,
          },
        ],
      }),
    });
    if (!responseRegister.ok) {
      const { errorMessage } = await responseRegister.json();
      return {
        error: {
          message: errorMessage,
        },
      };
    }

    // 2.1.1 Set role
    const responseRole = await setRole(inUsedUsername, KC_CANDIDATE_ROLE_ID, KC_CANDIDATE_ROLE, credentials);
    if (!responseRole) {
      return {
        error: {
          message: `Failed to set role for user ${email}`,
        },
      };
    }

    // 2.1.2 Get user info, assign to createdUser
    createdUser = await getUser(inUsedUsername, credentials);
  }

  // 2.2 application go to this row meaning user is existed in keycloak, continue to login
  if (!createdUser) {
    return {
      error: {
        message: 'Failed to get user info',
      },
    };
  }

  const response = await fetch(`${KC_SERVER_URL}/realms/${KC_REALM}/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: inUsedUsername,
      password: process.env.KEYCLOAK_DEFAULT_USER_PASSWORD,
      client_id: KC_CLIENT_ID,
      client_secret: KC_CLIENT_SECRET,
    }),
  });

  if (response.status === 401) {
    return {
      error: {
        message: 'Invalid username or password',
      },
    };
  } else if (!response.ok) {
    const resp = await response.json();
    const { errorMessage } = resp;
    return {
      error: {
        message: errorMessage,
      },
    };
  }

  // 2.3 extracted data, return to front end
  const { access_token, refresh_token, expires_in, refresh_expires_in } = await response.json();
  const { id, firstName, lastName } = createdUser;
  const responseData = {
    id,
    username: inUsedUsername,
    firstName,
    lastName,
    email,
    access_token,
    refresh_token,
    expires_in,
    refresh_expires_in,
  };

  if (isNewUser){
    //  create user in database
    console.log("start create user in database: ", email);
    const user = await CandidateModel.create({ email: email });
    if (!user) {
      return {
        error: {
          message: 'Failed to create user in database',
        },
      };
    }
  }

  

  return responseData;
};

const googleLoginHandler = async (token = '', res) => {
  try {
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
    const data = await response.json();

    if (data.error) {
      return ErrorResponse(new Error(data.error?.message || 'Can not login with google, try again'), res);
    }

    const responseKeycloak = await keycloakCreateUserAndLogin(data);

    if (responseKeycloak.error) {
      return ErrorResponse(new Error(responseKeycloak.error.message), res);
    }

    return SetResponse(res, STATUS_CODES.OK, { ...responseKeycloak, role: 'candidate' }, 'OK', null);
  } catch (error) {
    console.log('error>>', error);
    return ErrorResponse(new Error('Can not get gooogle user data'), res);
  }
};

const githubLoginHandler = async (token = '', res) => {
  try {
    console.log(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${token}`,
    );

    // 1. get accesstoken from authorization code
    const tokenResponse = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const dataText = await tokenResponse.text();
    const parsedData = parseQueryString(dataText);
    if (parsedData.error) {
      return ErrorResponse(new Error(parsedData.error), res);
    }

    // 2. get user data from github with access token
    const { access_token } = parsedData;
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const userData = await response.json();

    const { login, name } = userData;

    const nameTokens = name.split(' ');
    const family_name = nameTokens[nameTokens.length - 1];
    const given_name = nameTokens.slice(0, nameTokens.length - 1).join(' ');

    const responseKeycloak = await keycloakCreateUserAndLogin({
      initUserName: login,
      family_name,
      given_name,
    });

    if (responseKeycloak.error) {
      return ErrorResponse(new Error(responseKeycloak.error.message), res);
    }

    return SetResponse(res, STATUS_CODES.OK, { ...responseKeycloak, role: 'candidate' }, 'OK', null);
  } catch (error) {
    console.log('error>>', error);
    return ErrorResponse(new Error('Can not get github user data'), res);
  }
};

const candidateController = {
  login: async (req, res) => {
    console.log('login start processing');
    // handle case for google login
    const { type, token } = req.body;
    if (!token) {
      return ErrorResponse(new Error('Token is required'), res);
    }

    if (type === 'google') {
      return googleLoginHandler(token, res);
    }

    if (type === 'github') {
      return githubLoginHandler(token, res);
    }

    return ErrorResponse(new Error('Invalid type login'), res);
  },

  getInfo: async (req, res) => {
    try {
      // get user info from keycloak and database
      const access_token = req.headers.authorization.split(' ')[1];
      const at_data = jwt.decode(access_token);
      const { email, name } = at_data;

      const pre_db_response = await CandidateModel.findOne({
        where: { email: email },
        attributes: {
          exclude: ["createdAt", "id",]
        }
      });
      const db_response = pre_db_response ? pre_db_response.dataValues : pre_db_response;

      const { limit = 5, offset = 0 } = req.query;
      const pre_cvs = await CVModel.findAndCountAll({
        where: {
          email: email,
          archived: false
        },
        limit: limit,
        offset: offset,
        order: [['createdAt', 'DESC']],
        attributes: {
          exclude: ["archived", "createdAt", "email"]
        }
      });
      const CVs = pre_cvs ? pre_cvs.rows : pre_cvs;
      const total = pre_cvs ? pre_cvs.count : 0;
      // format date
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      db_response.updatedAt = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(db_response.updatedAt));
      const myCVs = CVs.map(cv => {
        cv.updatedAt = new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(cv.updatedAt));
        cv.id = maskId(cv.id, DBTypeUser);
        return cv;
      });

      // return data
      const data = {
        email: email,
        fullName: name,
        ...db_response,
        myCVs: myCVs,
      };

      return SetResponse(res, STATUS_CODES.OK, data, 'OK', {
        limit, offset, total
      });
    } catch (error) {
      return ErrorResponse(new Error('Can not get user data'), res);
    }
  },

  updateInfo: async (req, res) => {
    try {
      const access_token = req.headers.authorization.split(' ')[1];
      const at_data = jwt.decode(access_token);
      const { email, sub: kc_userId, given_name: kc_firstName, family_name: kc_lastName } = at_data;
      const data = req.body;

      // check invalid field in data (email)
      if (data.email) {
        return ErrorResponse(new Error('Invalid field'), res);
      }

      // check last name and first name and update in keycloak
      const { firstName, lastName, ...rest } = data;
      if (firstName || lastName) {
        const credentials = await getCredentials();
        const response = await fetch(`${KC_SERVER_URL}/admin/realms/${KC_REALM}/users/${kc_userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${credentials.access_token}`,
          },
          body: JSON.stringify({
            firstName: firstName ? firstName : kc_firstName,
            lastName: lastName ? lastName : kc_lastName,
          }),
        });
        if (!response.ok) {
          return ErrorResponse(new Error('Failed to change first name'), res);
        }
      }

      // update user data in database
      const db_response = await CandidateModel.update(rest, { where: { email: email } });
      if (!db_response) {
        return ErrorResponse(new Error('Failed to update user data'), res);
      }

      return SetResponse(res, STATUS_CODES.OK, null, 'Update successfully!', null);
    } catch (error) {
      return ErrorResponse(new Error('Can not update user data'), res);
    }
  },

  uploadCV: async (req, res) => {
    try {
      const access_token = req.headers.authorization.split(' ')[1];
      const at_data = jwt.decode(access_token);
      const { email } = at_data;
      let { is_main } = req.body.is_main ? req.body : { is_main: true };
      // count cv of user to set is)main true or false
      const cvs = await CVModel.findAndCountAll({ where: { email: email } });
      if (cvs.count === 0) {
        is_main = true;
      }

      if (is_main === true) {
        await CVModel.update({ is_main: false },
          {
            where: {
              email: email,
              is_main: true
            }
          });
      }

      const cv = await CVModel.create({ email: email, ...req.body });
      if (!cv) {
        return ErrorResponse(new Error('Failed to upload CV'), res);
      }
      return SetResponse(res, STATUS_CODES.OK, null, 'Upload successfully!', null);
    } catch (error) {
      return ErrorResponse(new Error('Can not upload CV'), res);
    }
  },

  deleteCV: async (req, res) => {
    try {
      const access_token = req.headers.authorization.split(' ')[1];
      const at_data = jwt.decode(access_token);
      const { email } = at_data;
      const { id } = req.body;
      const decodedId = unmaskId(id, DBTypeUser);

      const cv = await CVModel.findOne({ where: { id: decodedId } });
      if (cv.email !== email) {
        return UnauthorizeError("Unauthorize", "You don't have permission to delete this CV");
      }

      const result = await CVModel.update({ archived: true }, { where: { id: decodedId } });
      if (!result) {
        return ErrorResponse(new Error('Failed to delete CV'), result);
      }
      return SetResponse(res, STATUS_CODES.OK, null, 'Delete successfully!', null);
    } catch (error) {
      return ErrorResponse(new Error('Can not delete CV'), res);
    }
  }
};

module.exports = candidateController;
