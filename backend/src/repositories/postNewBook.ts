import {Book} from "../interface/book";
import {notifications} from "../services/notifications";
import { promises as fsPromises } from 'fs';

/**
 * Add new book in JSON and send notification to Mercure
 *
 * @param fileBooksData
 * @param newBook
 */
export const postNewBook = async (fileBooksData: string, newBook: Book): Promise<void> => {
  try {
    const file = await fsPromises.readFile(fileBooksData, 'utf-8');
    const rawListBooks = JSON.parse(file);
    rawListBooks.push(newBook);
    await fsPromises.writeFile(fileBooksData, JSON.stringify(rawListBooks, null, 2), 'utf-8')

    notifications(null);
  } catch (err: unknown) {
    throw new Error('Error write new book');
  }
}
