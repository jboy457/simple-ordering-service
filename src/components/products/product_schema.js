const Joi = require('joi');

const CreateProductSchema = Joi.object({
    body: Joi.object({
        productName: Joi.string().trim().required(),
        cost: Joi.number().valid(2, 5, 10, 20, 50, 100).required(),
        amountAvailable: Joi.number().required(),
    }),
}).options({ allowUnknown: true });

const UpdateProductSchema = Joi.object({
    body: Joi.object({
        productName: Joi.string().trim().required(),
        cost: Joi.number().valid(2, 5, 10, 20, 50, 100).required(),
        amountAvailable: Joi.number().required(),
    }),
    params: Joi.object({
        productId: Joi.number().required().label('productId'),
    }),
}).options({ allowUnknown: true });

const ProductIdSchema = Joi.object({
    params: Joi.object({
        productId: Joi.number().required().label('productId'),
    }),
}).options({ allowUnknown: true });

module.exports = {
    CreateProductSchema,
    ProductIdSchema,
    UpdateProductSchema,
};
