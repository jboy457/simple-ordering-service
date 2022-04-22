const Joi = require('joi');

const UserSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().valid('buyer', 'seller').required(),
    }),
}).options({ allowUnknown: true });

const UserIdSchema = Joi.object({
    params: Joi.object({
        userId: Joi.number().required().label('userId'),
    }),
}).options({ allowUnknown: true });

const UpdateUserSchema = Joi.object({
    body: Joi.object({
        username: Joi.string().trim().required(),
        role: Joi.string().valid('buyer', 'seller').required(),
    }),
}).options({ allowUnknown: true });

const UserDepositSchema = Joi.object({
    body: Joi.object({
        amount: Joi.number().valid(2, 5, 10, 20, 50, 100).required(),
    }),
}).options({ allowUnknown: true });

module.exports = {
    UserSchema,
    UserIdSchema,
    UpdateUserSchema,
    UserDepositSchema,
};
