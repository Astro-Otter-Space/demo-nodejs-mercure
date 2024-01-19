/**
 * HTTPS + libraries + ENV
 */
import * as https from "https";
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

import * as fs from "fs";
import { join } from 'path';

import * as process from "process";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Services
 */
import {fileDirName} from "./services/fileDirName";

/**
 * Express, CORS
 */
const app = express();
const port: number = process.env.PORT_API ? parseInt(process.env.PORT_API) : 8080;

app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '* ');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Expose-Headers', 'Link')
  res.header('Link', `<${process.env.MERCURE_PUBLIC_URL}>; rel="mercure"`)
  next();
});



const { __dirname } = fileDirName(import.meta);
const keyPem: string = join(__dirname, 'data', 'localhost-key.pem');
const certPem: string = join(__dirname, 'data', 'localhost.pem');
app.use(express.json());

/**
 * Swagger
 */
const swagerOptions = {
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
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swagerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * HOME
 */
import home from './routes/home';
app.use('/', home);

/**
 * BOOKS
 */
import books from './routes/books';
app.use('/books', books);

/**
 * Create HTTPS server
 */
const options = {
  key: fs.readFileSync(keyPem),
  cert: fs.readFileSync(certPem)
}
https
  .createServer(options, app)
  .listen(port, () => {
    console.log(`Server API is running on https://127.0.0.1:${port}`);
});
