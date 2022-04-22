const { Router } = require('express');
const controllers = require('./user_controller');
const { validate } = require('../../utils');
const { UserSchema, UserIdSchema } = require('./user_schema');

class UserRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/users', validate(UserSchema), controllers.addUser);
        this.router.get('/users', validate(UserSchema), controllers.getAllUser);
        this.router.get(
            '/users/:userId',
            validate(UserIdSchema),
            controllers.getUser,
        );
        this.router.put(
            '/users/:userId',
            validate(UserIdSchema),
            controllers.editUser,
        );
        this.router.delete(
            '/users/:userId',
            validate(UserIdSchema),
            controllers.deleteUser,
        );
    }
}

module.exports.routes = new UserRoutes().router;
