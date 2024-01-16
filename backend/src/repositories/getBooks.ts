import {Book} from '../interface/book'
import * as fs from 'fs';

/**
 * Read all books and return list of Book
 *
 * @param fileBooksData
 * @return Book[]
 */
export const getBooks = (fileBooksData: string): Book[] => {
  if (!fs.existsSync(fileBooksData)) {
    throw new Error('File books.json does not exist');
  }

  const rawBooks = fs.readFileSync(fileBooksData, 'utf-8');
  if (!Array.isArray(JSON.parse(rawBooks))) {
    throw new Error('Invalid JSON format. Expected an array.');
  }

  return JSON.parse(rawBooks).map((item: Book) => {
    const { uuid, title, author, price, stock} = item;

    if (typeof uuid !== "string" && typeof title !== "string" && typeof author !== "string") {
      throw new Error("Invalid JSON format for field uuid, title or author");
    }

    return { uuid, title, author, price, stock};
  })
}
