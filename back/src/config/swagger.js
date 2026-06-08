const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const env = require('./env');

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AmigoPet API',
      version: '1.0.0',
      description: 'Documentacao da API base do sistema AmigoPet.',
    },
    servers: [
      {
        url: `http://localhost:${env.port}${env.apiPrefix}`,
        description: 'Servidor local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/swagger/*.js'],
});

module.exports = { swaggerUi, swaggerSpec };
