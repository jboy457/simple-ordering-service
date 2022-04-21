const Joi = require('joi');
const { logger } = require('../config');
const { Response } = require('./response');

function validate(schema) {
    return async (req, res, next) => {
        if (!Joi.isSchema(schema)) {
            logger.error('Invalid joi schema');
        }
        try {
            await schema.validateAsync(req);
        } catch (e) {
            console.log(e.details);
            const validationErrors = e.details.map(errorDetail => ({
                key: errorDetail.context.key,
                message: errorDetail.message,
            }));
            return new Response(res, 422, 'Validation Error', validationErrors);
        }
        return next();
    };
}

module.exports = { validate };
