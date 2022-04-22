const { logger } = require('../../config');
const { Response } = require('../../utils');

module.exports = Object.freeze({
    isSeller: async (req, res, next) => {
        try {
            const { role } = req.user;
            if (role !== 'seller')
                return new Response(res, 401, 'Unauthorized user');
            return next();
        } catch (err) {
            console.log(err);
            logger.error(err);
            return new Response(res, 500);
        }
    },

    isBuyer: async (req, res, next) => {
        try {
            const { role } = req.user;
            if (role !== 'buyer')
                return new Response(res, 401, 'Unauthorized user');
            return next();
        } catch (err) {
            console.log(err);
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
