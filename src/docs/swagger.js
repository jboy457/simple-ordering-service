const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    servers: [
        {
            description: 'Production',
            url: 'https://simplepurchase.herokuapp.com/api/v1',
        },
        {
            description: 'Development',
            url: 'http://localhost:3001/api/v1',
        },
    ],

    info: {
        title: 'Simple Purchase service.',
        version: '1.0.0',
        description: 'Buy and sell products',
    },
    tags: [
        {
            name: 'User',
            description:
                'This endpoint provides information about a particular user',
        },
        {
            name: 'Product',
            description:
                'This endpoint provides information about a particular product',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./**/*.yaml'],
};
module.exports = swaggerJSDoc(options);
