const { Router } = require('express');
const controllers = require('./user_controller');
const { validate } = require('../../utils');
const {
    UserSchema,
    UserIdSchema,
    UpdateUserSchema,
    UserDepositSchema,
    UserLoginSchema,
} = require('./user_schema');
const { isAuthenticated, isBuyer } = require('../../middlewares/auth');

class UserRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/users', validate(UserSchema), controllers.addUser);
        this.router.get('/users', controllers.getAllUser);
        this.router.put(
            '/users',
            isAuthenticated,
            validate(UpdateUserSchema),
            controllers.editUser,
        );
        this.router.delete(
            '/users',
            isAuthenticated,
            validate(UserIdSchema),
            controllers.deleteUser,
        );
        this.router.patch(
            '/deposit',
            isAuthenticated,
            isBuyer,
            validate(UserDepositSchema),
            controllers.deposit,
        );
        this.router.patch(
            '/reset',
            isAuthenticated,
            isBuyer,
            controllers.resetUser,
        );
        this.router.post(
            '/user/login',
            validate(UserLoginSchema),
            controllers.loginUser,
        );
        this.router.get(
            '/users/:userId',
            validate(UserIdSchema),
            controllers.getUser,
        );
    }
}

module.exports.routes = new UserRoutes().router;
