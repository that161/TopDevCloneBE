const isValidToken = require('../grpc/client.js'); // for grpc
const { UnauthorizeError } = require('../utils/app-errors.js');
// const checkAuth = require('../utils/auth.js'); // for rest
const { ErrorResponse } = require('../utils/error-handler');

const auth = (roles) => {
  return async (req, res, next) => {
    try {
      let token = req.headers.authorization;

      if (!token) {
        throw new UnauthorizeError('Unauthorized');
      }

      token = token.split(' ')[1];

      const roleValidations = await Promise.all(roles.map((role) => isValidToken(token, role)));
      const valid = roleValidations.some((result) => result.valid);

      // const roleValidations = await Promise.all(roles.map(role => checkAuth(token, role))); // for rest
      // const valid = roleValidations.some(result => result); // for rest

      if (!valid) {
        throw new UnauthorizeError('Invalid token');
      }

      const userId = roleValidations.find((result) => result.valid).userId;
      const companyId = roleValidations.find((result) => result.valid).companyId;
      req.user = { id: userId, companyId: companyId };

      // need to pass companyId to req.user

      next();
    } catch (error) {
      console.error(`Error in RequireRole middleware for roles ${roles}`, error);

      ErrorResponse(new UnauthorizeError('Unauthorized', 'Please login first'), res);
    }
  };
};

module.exports = auth;
