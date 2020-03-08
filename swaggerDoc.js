const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'CS4783Assignment',
            version: '1.0.0',
            description: 'Jennifer Nguyen and Jason Kha'
        },
        host: 'localhost',
        bathPath: '/',
        schemes: ['http://localhost:12110', 'https://localhost:12111']
        
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};