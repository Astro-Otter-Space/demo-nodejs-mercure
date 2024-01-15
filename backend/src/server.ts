/**
 * HTTP librairies
 */
import express, {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';

/**
 * Express
 */
const app = express();
const port: number = 3000;

/**
 * Routes GET
 */
app.get('/books', (req: Request, res: Response) => {

    res
        .status(StatusCodes.OK)
        .end();
});

/**
 * Routes POST/PUT
 */
app.post('/books', (req: Request, res: Response) => {
    res
        .status(StatusCodes.CREATED)
        .end()
});

app.put('/books/:id', (req: Request, res: Response) => {
    res
        .status(StatusCodes.OK)
        .end()
});

const server = app.listen(port, () => {
    console.log(`Server API is running on http://localhost:${port}`);
});

server.timeout = 10000;
