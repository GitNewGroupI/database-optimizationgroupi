// src/config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Retail API',
      version: '1.0.0',
      description: 'API documentation for the Online Retail project',
    },
    servers: [
      {
        url: 'http://localhost:3008', // Changed to match your server port
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Removed controllers, focusing on routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;