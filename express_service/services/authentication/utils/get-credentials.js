const { KC_SERVER_URL, KC_REALM, KC_CLIENT_ID, KC_CLIENT_SECRET } = require('../configuration/keycloak.js');

async function getCredentials() {
  const url = `${KC_SERVER_URL}/realms/${KC_REALM}/protocol/openid-connect/token`;
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: KC_CLIENT_ID,
    client_secret: KC_CLIENT_SECRET,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errorMessage || 'Failed to fetch credentials');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching credentials: ${error.message}`);
    return null;
  }
}

module.exports = getCredentials;
