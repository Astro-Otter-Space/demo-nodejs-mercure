import {Book} from "../interface/book";
import {getBooks} from "./getBooks";

/**
 * Retrieve Book from uuid
 *
 * @param fileBooksData
 * @param uuid
 *
 * @return Book|null
 */
export const getBook = (fileBooksData: string, uuid: string): Book|null => {
  const listBooks: Book[] = getBooks(fileBooksData);
  return listBooks.filter((b: Book) => b.uuid === uuid)[0] ?? null;
}
