import {Book} from "../interface/book";
import {getBooks} from "./getBooks";

export const getBook = (fileBooksData: string, uuid: string): Book|null => {
  const listBooks: Book[] = getBooks(fileBooksData);
  return listBooks.filter((b: Book) => b.uuid === uuid)[0] ?? null;
}
