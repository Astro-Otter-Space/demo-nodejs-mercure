  /**
   * HTTPS + libraries + ENV
   */
import spdy from "spdy";
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
const useSSL = !!process.env.SSL;

console.log(useSSL);

import swaggerUi from 'swagger-ui-express';
import swaggerOptions from "./swaggerOptions";

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
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Expose-Headers', 'Link')
  res.header('Link', `<${process.env.MERCURE_PUBLIC_URL}>; rel="mercure"`)
  next();
});

const { __dirname } = fileDirName(import.meta);
const privateKey: string = join(__dirname, 'cert', 'localhost.key');
const certificate: string = join(__dirname, 'cert', 'localhost.crt');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions));

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
  key: fs.readFileSync(privateKey),
  cert: fs.readFileSync(certificate),
  // ca: fs.readFileSync(ca)
}
spdy
  .createServer(options, app)
  .listen(port, () => {
    console.log(`Server API is running on https://127.0.0.1:${port}`);
});
