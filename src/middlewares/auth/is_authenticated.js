const { UserRepository } = require('../../components/users/user_repository');
const { logger, redisClient } = require('../../config');
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
            if (!userId) return new Response(res, 401, 'Session Expired');
            let user;
            const cachedUser = await redisClient.get(`users:${userId}`);
            user = JSON.parse(cachedUser);
            if (!user) {
                user = await UserRepository.findById(userId);
                redisClient.set(`users:${user.id}`, JSON.stringify(user));
            }
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
