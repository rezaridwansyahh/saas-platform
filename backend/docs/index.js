// docs/index.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'My API Docs',
    version: '1.0.0',
    description: 'API documentation using Swagger',
  },
  servers: [
    { 
      url: 'http://localhost:3000', // Replace with your port
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/paths/*.js', './docs/schemas/*.js'], // point to your docs
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;