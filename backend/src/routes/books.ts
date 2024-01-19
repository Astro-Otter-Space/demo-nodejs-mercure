/**
 * Router
 */
import { Router, Request, Response } from 'express';
const router: Router = Router(); //express.Router();

import {StatusCodes} from "http-status-codes";
import {join} from "path";
import {v4 as uuidv4} from 'uuid';

/**
 * Repositories
 */
import {Book} from "../interface/book";
import {getBooks} from "../repositories/getBooks";
import {getBook} from "../repositories/getBook";

/**
 * Services
 */
import {fileDirName} from "../services/fileDirName";
import {postNewBook} from "../repositories/postNewBook";
import {putBook} from "../repositories/putBook";
import {deleteBook} from "../repositories/deleteBook";

/**
 * @todo: improve this
 */
const { __dirname } = fileDirName(import.meta);
const fileBooksData: string = join(__dirname, '..', 'data', 'books.json');

/**
 * @openapi
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     response:
 *       200:
 *         description: The created book
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         uuid:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         img:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         price:
 *           type: integer
 *           description: The date the book was added
 *         price:
 *           type: integer
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
router.get('/', (req: Request, res: Response): void => {
  try {
    console.log(fileBooksData);
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
router.get('/:uuid', (req: Request, res: Response): void => {
  try {
    const book: Book = getBook(fileBooksData, req.params.uuid);
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
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook = req.body;
    newBook.uuid = uuidv4();
    await postNewBook(fileBooksData, newBook);
    res
      .status(StatusCodes.CREATED)
      .json({
        status: 'success',
        data: {
          uuid: newBook.uuid
        },
        message: `Successfully adding resource`
      })
    ;
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

router.put('/:uuid', async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid: string = req.params.uuid;
    const updatedBook: Book = {...req.body, uuid: uuid};
    await putBook(fileBooksData, updatedBook);

    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        uuid: uuid
      },
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

router.delete('/:uuid', async (req: Request, res: Response): Promise<void> => {
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
});

export default router;
