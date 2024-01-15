import {Book} from '../interface/book'
import { readFileSync } from 'fs'

export const getBooks = (): Book[] => {
  const rawBooks = readFileSync('../data/books.json', 'utf-8');
  if (!rawBooks) {
    throw new Error('Cant read data file');
  }
  return JSON.parse(rawBooks).map((item: any) => {
    const { uid, title, author, price, stock} = item;

    if (typeof uid !== "string" && typeof title !== "string" && typeof author !== "string") {
      throw new Error("Invalid JSON format");
    }

    return { uid, title, author, price, stock};
  })
}
