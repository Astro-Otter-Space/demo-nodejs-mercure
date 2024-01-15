/**
 * HTTP libraries
 */
import express, {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {getBooks} from "./repositories/getBooks";

/**
 * Express
 */
const app = express();
const port: number = 3001;

/**
 * Routes GET
 */
app.get('/', (req: Request, res: Response) => {
  res.sendStatus(StatusCodes.OK).send('Check Swagger for API routes')
});

app.get('/books', (req: Request, res: Response) => {
  try {
    const listBooks = getBooks();
    res
      .status(StatusCodes.OK)
      .end(listBooks);
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).send(err.message);
  }
});

/**
 * Routes POST/PUT
 */
app.post('/books', (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .end()
});

app.put('/books/:uuid', (req: Request, res: Response) => {
  res
    .status(StatusCodes.OK)
    .end()
});

const server = app.listen(port, () => {
  console.log(`Server API is running on http://localhost:${port}`);
});

server.timeout = 10000;
