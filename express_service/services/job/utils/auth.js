const { AUTH_HOST } = require('../configs');

const checkAuth = async (token, role) => {
  try {
    const response = await fetch(`${AUTH_HOST}/${role}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Error occurred while fetching:', error);
    return false;
  }
};

module.exports = checkAuth;
