import {Book} from '../interface/book'
import data from './../../books.json';

export const getBooks = (): Book[] => {
  return data;
}
