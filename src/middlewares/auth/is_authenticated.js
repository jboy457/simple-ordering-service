const { UserRepository } = require('../../components/users/user_repository');
const { logger } = require('../../config');
const { Response, JWT } = require('../../utils');

module.exports = Object.freeze({
    isAuthenticated: async (req, res, next) => {
        try {
            if (!req.header('x-auth-token'))
                return new Response(
                    res,
                    401,
                    'Unauthorized user. Log in and try again',
                );
            const { id: userId } = await JWT.verify(req.header('x-auth-token'));
            console.log(userId);
            if (!userId) return new Response(res, 401, 'Session Expired');
            const user = await UserRepository.findById(userId);
            if (!user)
                return new Response(
                    res,
                    401,
                    'Unauthorized user. Log in and try again',
                );
            req.user = user;
            req.token = req.header('x-auth-token');
            return next();
        } catch (err) {
            console.log(err);
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
