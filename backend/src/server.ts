/**
 * HTTP libraries
 */
import * as https from "https";
import express, { Request, Response } from 'express';

import * as fs from "fs";
import {StatusCodes} from 'http-status-codes';
import { join } from 'path';
import {v4 as uuidv4} from 'uuid';

import * as process from "process";
import dotenv from 'dotenv';
dotenv.config();

/**
 * Types
 */
import {Book} from "./interface/book";

/**
 * Repositories
 */
import { getBooks } from './repositories/getBooks';
import {getBook} from "./repositories/getBook";
import {postNewBook} from "./repositories/postNewBook";
import {deleteBook} from "./repositories/deleteBook";
import {putBook} from "./repositories/putBook";

/**
 * Services
 */
import {fileDirName} from "./services/fileDirName";

/**
 * Express
 */
const app = express();
const port: number = process.env.PORT_API ? parseInt(process.env.PORT_API) : 3002;

const { __dirname } = fileDirName(import.meta);
const fileBooksData: string = join(__dirname, 'data', 'books.json');
const keyPem: string = join(__dirname, 'data', 'cert.key');
const certPem: string = join(__dirname, 'data', 'cert.crt');
app.use(express.json());

/**
 * Routes GET
 */
app.get('/', (req: Request, res: Response): void => {
  res.sendStatus(StatusCodes.OK).send('API for Mercure POC is up.')
});

/**
 * GET all books
 */
app.get('/books', (req: Request, res: Response): void => {
  try {
    const listBooks: Book[] = getBooks(fileBooksData);

    res
      .status(StatusCodes.OK)
      .json(listBooks);
  } catch (err: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: (err as Error).message,
        error: err
      }
    );
  }
});

/**
 * GET book by uuid
 */
app.get('/books/:uuid', (req: Request, res: Response): void => {
  try {
    const book = getBook(fileBooksData, req.params.uuid);
    res.status(StatusCodes.OK).json(book);
  } catch (err: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
          message: (err as Error).message,
          error: err
        }
      );
  }
});

/**
 * Routes POST, add new book
 */
app.post('/books', async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook = req.body;
    newBook.uuid = uuidv4();

    await postNewBook(fileBooksData, newBook);

    res.status(StatusCodes.OK)
      .json({
        status: 'success',
        data: [],
        message: `Successfully adding resource`
      });
  } catch (err: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
          message: (err as Error).message,
          error: err
        }
      );
  }
});

/**
 * PUT route
 */
app.put('/books/:uuid', async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid: string = req.params.uuid;
    const updatedBook: Book = {...req.body, uuid: uuid};
    await putBook(fileBooksData, updatedBook);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: [],
      message: `Successfully updated resource with id ${req.params.uuid}`
    });
  } catch (err: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
          message: (err as Error).message,
          error: err
        }
      );
  }
});

/**
 * DELETE route
 */
app.delete('/books/:uuid', async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid: string = req.params.uuid;
    await deleteBook(fileBooksData, uuid);

  } catch (err: unknown) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
          message: (err as Error).message,
          error: err
        }
      );
  }
  res.status(StatusCodes.OK).json({
    status: 'success',
    data: [],
    message: `Successfully deleted resource with id ${req.params.uuid}`
  });
})

/**
 * Create HTTPS server
 */
const options = {
  key: fs.readFileSync(keyPem),
  cert: fs.readFileSync(certPem)
}
https.createServer(options, app).listen(port, () => {
  console.log(`Server API is running on https://127.0.0.1:${port}`);
});
