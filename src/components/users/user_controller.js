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
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    getUser: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await UserService.getUserById(
                params.userId,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    getAllUser: async (req, res) => {
        try {
            const { query } = req;
            const { status, message, data } = await UserService.getUsers(query);
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    editUser: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await UserService.updateUser(
                params.userId,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { params } = req;
            const { status, message, data } = await UserService.deleteUser(
                params.userId,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
