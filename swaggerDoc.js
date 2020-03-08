const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'CS4783Assignment',
            version: '1.0.0',
            description: 'Jennifer Nguyen and Jason Kha'
        },
        servers: 'cs47831.fulgentcorp.com',
        bathPath: '/',
        schemes: ['http', 'https']
        
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};