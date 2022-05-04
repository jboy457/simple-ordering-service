const redis = require('redis');
const { app } = require('./app');
const { logger } = require('./logger');

const redisClient = redis.createClient({
    port: app.redisPort,
    host: `${app.redisHost}`,
    password: app.redisPassword,
});

redisClient.on('connect', () => {
    logger.info('Redis DB connected!');
});

redisClient.on('error', error => {
    logger.error(error);
});

module.exports = { redisClient };
