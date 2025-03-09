const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API SPA Documentation',
      version: '1.0.0',
      description: 'Documentation for API SPA',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [path.join(__dirname, '../../routes/*.js')], // Updated path
};

const specs = swaggerJsdoc(options);

module.exports = specs;
