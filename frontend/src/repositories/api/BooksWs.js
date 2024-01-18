import { getBooks } from '@/repositories/api/getBooks'
import { deleteBook } from "@/repositories/api/deleteBook";
import { postNewBook } from "@/repositories/api/postNewBook";
import { putBook } from "@/repositories/api/putBook";

export const BooksWs = {
  getBooks,
  postNewBook,
  putBook,
  deleteBook
}
