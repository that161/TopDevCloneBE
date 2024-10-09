const { KC_SERVER_URL, KC_REALM, KC_CLIENT_UUID } = require('../configuration/keycloak.js');
const getUser = require('./get-user');
const getCredentials = require('./get-credentials');

async function setRole(username, roleId, role, credentials = null) {
  try {
    // Fetch credentials if not provided
    if (!credentials) {
      credentials = await getCredentials();
      if (!credentials) {
        throw new Error('Failed to fetch credentials');
      }
    }

    // Get user info
    const userInfo = await getUser(username, credentials);
    if (!userInfo) {
      throw new Error('Failed to get user info');
    }

    // Set role
    const url = `${KC_SERVER_URL}/admin/realms/${KC_REALM}/users/${userInfo.id}/role-mappings/clients/${KC_CLIENT_UUID}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${credentials.access_token}`,
    };
    const body = JSON.stringify([
      {
        id: roleId,
        name: role,
      },
    ]);

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage || 'Failed to set role');
    }

    return true;
  } catch (error) {
    console.error(`Error setting role: ${error.message}`);
    return false;
  }
}

module.exports = setRole;
