const compression = require('compression');
const express = require('express');
const path = require('path');
const cors = require('cors');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const { LoggerStream, sequelize, logger } = require('./config');
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middlewares');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./docs/swagger');

class MyApp {
    constructor() {
        this.app = express();
        this.init();
    }

    init() {
        this.initSequelize();
        this.initMiddleware();
        this.initRoute();
    }

    initRoute() {
        this.app.use('/', swaggerUi.serve, swaggerUi.setup(swagger));
        this.app.use(notFoundMiddleware);
        this.app.use(errorHandlerMiddleware);
    }

    initMiddleware() {
        this.app.use(morgan('combined', { stream: LoggerStream }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
    }

    initSequelize() {
        sequelize.sync().then(async () => {
            logger.info('Database connected!!');
        });
    }
}

module.exports = new MyApp().app;
