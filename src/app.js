const compression = require('compression');
const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const morgan = require('morgan');
const { LoggerStream, sequelize, logger } = require('./config');
const { notFoundMiddleware, errorHandlerMiddleware } = require('./middlewares');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./docs/swagger');

// Components
const { routes: userRoutes } = require('./components/users');
const { routes: productRoutes } = require('./components/products');

class MyApp {
    constructor() {
        this.app = express();
        this.init();
    }

    init() {
        this.initDB();
        this.initMiddleware();
        this.initRoute();
    }

    initRoute() {
        this.app.use('/api/v1', userRoutes);
        this.app.use('/api/v1', productRoutes);
        this.app.use('/', swaggerUi.serve, swaggerUi.setup(swagger));
        this.app.use(notFoundMiddleware);
    }

    initMiddleware() {
        this.app.use(morgan('combined', { stream: LoggerStream }));
        this.app.use(compression());
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(express.json());
    }

    initDB() {
        sequelize.sync().then(async () => {
            logger.info('Database connected!!');
        });
        // redisClient.connect();
    }
}

module.exports = new MyApp().app;
