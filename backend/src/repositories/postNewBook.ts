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
    // Read file
    const file = await fsPromises.readFile(fileBooksData, 'utf-8');
    const rawListBooks = JSON.parse(file);

    // Add new entry
    rawListBooks.push(newBook);

    // Overwrite file
    await fsPromises.writeFile(fileBooksData, JSON.stringify(rawListBooks, null, 2), 'utf-8')

    notifications('add', 'success', `New book "${newBook.title}" have been added.`, newBook);
  } catch (err: unknown) {
    throw new Error('Error write new book');
  }
}
