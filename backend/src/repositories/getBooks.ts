import {Book} from '../interface/book'
import * as fs from 'fs';

export const getBooks = (fileBooksData: string): Book[] => {
  const rawBooks = fs.readFileSync(fileBooksData, 'utf-8');
  if (!Array.isArray(rawBooks)) {
    throw new Error('Invalid JSON format. Expected an array.');
  }

  return JSON.parse(rawBooks).map((item: Book) => {
    console.log(item)
    const { uuid, title, author, price, stock} = item;

    if (typeof uuid !== "string" && typeof title !== "string" && typeof author !== "string") {
      throw new Error("Invalid JSON format");
    }

    return { uuid, title, author, price, stock};
  })
}
