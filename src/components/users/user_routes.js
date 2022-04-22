const { Router } = require('express');
const controllers = require('./user_controller');
const { validate } = require('../../utils');
const { UserSchema } = require('./user_schema');

class UserRoutes {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/users', validate(UserSchema), controllers.addUser);
    }
}

module.exports.routes = new UserRoutes().router;
