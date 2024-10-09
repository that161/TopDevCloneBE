const isValidToken = require('../grpc/grpc-auth-client.js'); // for grpc
const { UnauthorizeError } = require('../../Domain/utils/app-errors.js');
const { ErrorResponse } = require('../../Domain/utils/error-handler');

const auth = (roles) => {
    return async (req, res, next) => {
        try {
            let token = req.headers.authorization;

            if (!token) {
                throw new Error('Unauthorized');
            }

            token = token.split(' ')[1];

            const roleValidations = await Promise.all(roles.map((role) => isValidToken(token, role)));
            const valid = roleValidations.some((result) => result.valid);

            if (!valid) {
                throw new UnauthorizeError('Invalid token');
            }

            const userId = roleValidations.find((result) => result.valid).userId;
            const email = roleValidations.find((result) => result.valid).email;
            req.user = { id: userId, email: email };


            next();
        } catch (error) {
            console.error(`Error in RequireRole middleware for roles ${roles}:`, error);
            ErrorResponse(error, res);
        }
    };
};

module.exports = auth;
