import {Book} from "../interface/book";
import {notifications} from "../services/notifications";
import { promises as fsPromises } from 'fs';

export const postNewBook = (fileBooksData: string, newBook: Book): void => {
    console.log(newBook);

    fsPromises.readFile(fileBooksData, 'utf-8')
      .then(data => {
        let json = JSON.parse(data);
        json.push(newBook);

        fsPromises.writeFile(fileBooksData, JSON.stringify(json))
          .then(() => notifications(null))
          .catch(err => {
            throw new Error('Cant add new book :' + err.message);
          })
      }
    )
    .catch(err => {
        throw new Error('Cant read JSON file: ' + err.message);
      })
}
