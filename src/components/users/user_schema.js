const Joi = require('joi');

const UserSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().valid('buyer', 'seller').required(),
    }),
}).options({ allowUnknown: true });

const UserIdSchema = Joi.object({
    params: Joi.object({
        userId: Joi.string().uuid().required().label('userId'),
    }),
}).options({ allowUnknown: true });

module.exports = { UserSchema, UserIdSchema };
