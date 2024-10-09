const { KC_CLIENT_ID, KC_CLIENT_SECRET, KC_REALM, KC_SERVER_URL } = require('../configuration/keycloak.js');
const jwt = require('jsonwebtoken');
const { STATUS_CODES } = require('../utils/app-errors');
const { SetResponse } = require('../utils/success-response');
const { ErrorResponse } = require('../utils/error-handler');

const otherController = {
  refreshToken: async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).send('Refresh token is required');
    }

    console.log('refreshToken>>', refreshToken);

    const response = await fetch(`${KC_SERVER_URL}/realms/${KC_REALM}/protocol/openid-connect/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: KC_CLIENT_ID,
        client_secret: KC_CLIENT_SECRET,
        refresh_token: refreshToken,
      }),
    });

    const responseData = await response.json();

    if (responseData && responseData.access_token && responseData.refresh_token) {
      const data = await jwt.decode(responseData.access_token);
      const { access_token, refresh_token } = responseData;
      return res.status(200).send({
        access_token,
        refresh_token,
        userId: data.sub,
      });
    } else if (responseData && responseData.error) {
      return res.status(400).send(responseData);
    }
    return res.status(400).send('Error refreshing token');
  },

  logout: async (req, res, next) => {
    try {
      const refreshToken = req.body.refresh_token;

      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }

      const response = await fetch(`${KC_SERVER_URL}/realms/${KC_REALM}/protocol/openid-connect/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: KC_CLIENT_ID,
          client_secret: KC_CLIENT_SECRET,
          refresh_token: refreshToken,
        }),
      });

      if (!response.ok) {
        const { error_description } = await response.json();
        throw new Error(error_description || 'Failed to logout');
      }

      // Uncomment if you want to clear cookies
      // res.clearCookie('access_token');
      // res.clearCookie('refresh_token');

      return SetResponse(res, STATUS_CODES.OK, {}, 'Logout successful', null);
    } catch (error) {
      console.error('Error during logout:', error);
      return ErrorResponse(error, res);
    }
  },
};

module.exports = otherController;
