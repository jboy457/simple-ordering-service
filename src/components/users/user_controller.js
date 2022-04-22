const { logger } = require('../../config');
const { Response } = require('../../utils');
const { UserService } = require('./user_service');

module.exports = Object.freeze({
    addUser: async (req, res) => {
        try {
            const { body } = req;
            const { status, message, data } = await UserService.createUser(
                body,
            );
            return new Response(status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
