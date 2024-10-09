const { PORT } = require('../configuration/app');
const jwt = require('jsonwebtoken');

const verifyToken = async (token, role) => {
  try {
    const uri = `${process.env.AUTHENTICATION_HOST}/${role}` || `http://localhost:${PORT}/${role}`
    const response = await fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = jwt.decode(token);

    return {
      status: response.status === 200,
      userId: data?.sub,
      email: data?.email,
    };
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return false;
  }
};

module.exports = verifyToken;
