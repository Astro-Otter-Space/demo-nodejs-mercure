/**
 * @openapi
 * tags:
 *   name: Books
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Get all books
 *     description: Retrieve list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Books'
 *       500:
 *          description: Internal server error
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookBody'
 *     responses:
 *       201:
 *         description: The created book
 * /books/{uuid}:
 *   get:
 *     summary: Get book by uuid
 *     tags: [Books]
 *     parameters:
 *       - name: uuid
 *         in: path
 *         description: Unique UUID of book
 *         required: true
 *     responses:
 *       200:
 *         description: The book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Books'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 *   put:
 *     summary: Update book by uuid
 *     tags: [Books]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookBody'
 *     parameters:
 *       - name: uuid
 *         in: path
 *         description: Unique UUID of book
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *   delete:
 *     summary: Delete book by uuid
 *     tags: [Books]
 *     parameters:
 *       - name: uuid
 *         in: path
 *         description: Unique UUID of book
 *         required: true
 *     response:
 *       200:
 *         description: Success
 * /books/{uuid}/buy:
 *  patch:
 *    summary: Decrease only stock value
 *    tags: [Books]
 *    url: /buy
 *    parameters:
 *      - name: uuid
 *        in: path
 *        description: Unique UUID of book
 *        required: true
 *    responses:
 *      200:
 *        description: Success
 * components:
 *   schemas:
 *     Books:
 *       type: object
 *       required:
 *         - uuid
 *         - title
 *         - author
 *         - img
 *         - price
 *         - stock
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
 *           description: Price of book
 *         stock:
 *           type: integer
 *           description: Stock of books
 *       example:
 *         uuid: ee0cf287-65ad-4c51-8e73-f5c9738763b8
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         img: http://www.exemple.com/path-to-cover.jpg
 *         price: 25
 *         stock: 20
 *     BookBody:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - img
 *         - price
 *         - stock
 *       properties:
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
 *           description: Price of book
 *         stock:
 *           type: integer
 *           description: Stock of books
 *       example:
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         img: http://www.exemple.com/path-to-cover.jpg
 *         price: 25
 *         stock: 20
 */

/*
 * Router
 */
import { Router, Request, Response } from 'express';
const router: Router = Router();

import {StatusCodes} from "http-status-codes";
import {join} from "path";
import {v4 as uuidv4} from 'uuid';

/*
 * Repositories
 */
import {Book} from "../interface/book";
import {getBooks} from "../repositories/getBooks";
import {getBook} from "../repositories/getBook";

/*
 * Services
 */
import {fileDirName} from "../services/fileDirName";
import {postNewBook} from "../repositories/postNewBook";
import {putBook} from "../repositories/putBook";
import {deleteBook} from "../repositories/deleteBook";

/*
 * TODO: improve this
 */
const { __dirname } = fileDirName(import.meta);
const fileBooksData: string = join(__dirname, '..', 'data', 'books.json');

router.get('/', (req: Request, res: Response): void => {
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

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook = req.body;
    newBook.uuid = uuidv4();
    await postNewBook(fileBooksData, newBook);
    res
      .status(StatusCodes.CREATED)
      .json({
        status: 'success'
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

    res
      .status(StatusCodes.OK)
      .json({
        status: 'success'
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

router.patch('/:uuid/buy', async (req: Request, res: Response): Promise<void> => {
  try {
    const uuid: string = req.params.uuid;
    const book: Book = getBook(fileBooksData, uuid);
    book.stock--;
    await putBook(fileBooksData, book);

    res
      .status(StatusCodes.OK)
      .json({
        status: 'success'
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

    res.status(StatusCodes.OK).json({
      status: 'success'
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

export default router;
