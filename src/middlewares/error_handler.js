const { logger } = require('../config');
const { Response } = require('../utils');

const notFound = (req, res, next) => {
    const err = {};
    err.statusCode = 404;
    err.message = `Invalid request ${req.method} ${req.originalUrl}`;
    next(err);
};
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    logger.log({
        level: 'error',
        message: err,
    });
    logger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
            req.method
        } - ${req.ip}`,
    );
    return new Response(res, statusCode, err.message);
};

module.exports = {
    errorHandlerMiddleware: errorHandler,
    notFoundMiddleware: notFound,
};
