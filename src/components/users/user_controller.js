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

    loginUser: async (req, res) => {
        try {
            const { body } = req;
            const { status, message, data } =
                await UserService.authenticateUser(body);
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

    resetUser: async (req, res) => {
        try {
            const { user } = req;
            const { status, message, data } = await UserService.resetDeposit(
                user.id,
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
            const { user, body } = req;
            const { status, message, data } = await UserService.updateUser(
                user.id,
                body,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { user } = req;
            const { status, message, data } = await UserService.deleteUser(
                user.id,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },

    deposit: async (req, res) => {
        try {
            const { user, body } = req;
            const { status, message, data } = await UserService.addMoney(
                user.id,
                body.amount,
            );
            return new Response(res, status, message, data);
        } catch (err) {
            logger.error(err);
            return new Response(res, 500);
        }
    },
});
