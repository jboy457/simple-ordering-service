const dotenv = require('dotenv');
const { logger } = require('./logger');

dotenv.config();

const port = process.env.PORT || 3001;
const host = process.env.APP_HOST || '0.0.0.0';
const name = process.env.APP_NAME || 'simple-purchase-service';

// Database Credentails
const dbDialect = process.env.DB_DIALECT || 'mysql';
const dbUser = process.env.DB_USER || 'root';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = parseInt(process.env.DB_PORT, 10) || 3306;
const dbName = process.env.DB_NAME || 'db';
const dbPassword = process.env.DB_PASSWORD || '';

// JWT
const jwtSecret = process.env.JWT_SECRET;

const app = {
    port,
    host,
    name,
    dbDialect,
    dbUser,
    dbHost,
    dbName,
    dbPort,
    dbPassword,
    jwtSecret,
};

console.log(app);

module.exports = { app };
