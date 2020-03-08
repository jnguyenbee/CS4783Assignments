const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'CS4783Assignment',
            version: '1.0.0',
            description: 'Jennifer Nguyen and Jason Kha'
        },
        //host: 'https://localhost:3000',
        bathPath: '/'
            //   schemes: [https, http]
            
    },
    apis: ['routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = app => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};