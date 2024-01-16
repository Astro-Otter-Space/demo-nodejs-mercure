/**
 * HTTP libraries
 */
import express, { Request, Response } from 'express';
import {StatusCodes} from 'http-status-codes';
import { join } from 'path';
import {v4 as uuidv4} from 'uuid';
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
import {getBook} from "./repositories/getBook";
import {postNewBook} from "./repositories/postNewBook";
import {deleteBook} from "./repositories/deleteBook";
import {putBook} from "./repositories/putBook";

/**
 * Express
 */
const app = express();
const port: number = 3001;
const { __dirname } = fileDirName(import.meta);
const fileBooksData: string = join(__dirname, 'data', 'books.json');
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

const server = app.listen(port, () => {
  console.log(`Server API is running on http://localhost:${port}`);
});

server.timeout = 10000;
