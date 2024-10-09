const { KC_SERVER_URL, KC_REALM } = require('../configuration/keycloak.js');
const getCredentials = require('../utils/get-credentials');

async function getUser(username, credentials = null) {
  try {
    // Fetch credentials if not provided
    if (!credentials) {
      credentials = await getCredentials();

      if (!credentials) {
        throw new Error('Failed to fetch credentials');
      }
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.access_token}`,
    };

    const url = `${KC_SERVER_URL}/admin/realms/${KC_REALM}/users?username=${username}&exact=true`;

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage || 'Failed to get user');
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error getting user: ${error.message}`);
    return null;
  }
}

module.exports = getUser;
