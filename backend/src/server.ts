/**
 * HTTP libraries
 */
import express, { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import { join } from 'path';

/**
 * Types
 */
import {Book} from "./interface/book";

/**
 * Repositories
 */
import { getBooks } from './repositories/getBooks';

/**
 * Services
 */
import {fileDirName} from "./services/fileDirName";

/**
 * Express
 */
const app = express();
const port: number = 3001;
const { __dirname } = fileDirName(import.meta);
const fileBooksData: string = join(__dirname, 'data', 'books.json');

/**
 * Routes GET
 */
app.get('/', (req: Request, res: Response): void => {
  res.sendStatus(StatusCodes.OK).send('API for Mercure POC is up.')
});

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

app.get('/books/:uuid', (req: Request, res: Response): void => {
  try {
    const listBooks: Book[] = getBooks(fileBooksData);
    const book: Book = listBooks.filter((b: Book) => b.uuid === req.params.uuid)[0];
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
 * Routes POST/PUT
 */
app.post('/books', (req: Request, res: Response): void => {
  res
    .status(StatusCodes.CREATED)
    .end()
});

app.put('/books/:uuid', (req: Request, res: Response): void => {
  res
    .status(StatusCodes.OK)
    .end()
});

const server = app.listen(port, () => {
  console.log(`Server API is running on http://localhost:${port}`);
});

server.timeout = 10000;
