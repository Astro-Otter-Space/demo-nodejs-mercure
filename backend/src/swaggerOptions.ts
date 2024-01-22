import process from "process";
import {Options} from "swagger-jsdoc";

const port: number = process.env.PORT_API ? parseInt(process.env.PORT_API) : 8080;

/**
 * Swagger
 */
const swagerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST - Mercure',
      version: '1.0.0',
      description: 'A sample API for learning Swagger',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Local environment server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  output: './swagger.json'
};


export default swagerOptions;
