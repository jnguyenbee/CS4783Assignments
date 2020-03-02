const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test Express API with blah'
        },
        host: 'https://localhost:3000',
        bathPath: '/'
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};