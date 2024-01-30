import * as querystring from "querystring";
import * as http from "http";
import {MercureConfig} from "../configuration/Mercure";
import {Book} from "../interface/book";

/**
 * Send notification to Mercure
 * @param uriTopic
 * @param book
 * @param type
 * @param message
 */
export const notifications = (
  uriTopic: string | null,
  type: string,
  message: string,
  book: Book | null
): void => {
  const postData = querystring.stringify({
    topic: `https://localhost/books/${uriTopic}`,
    data: JSON.stringify({
      type: type,
      message: message,
      book: book
    })
  });

  console.log(querystring.parse(postData))

  const req = http.request(MercureConfig as http.RequestOptions, (/*res*/) => {
    // console.log(`Status: ${res.statusCode}`);
    // console.log(`Headers: ${JSON.stringify(res.headers)}`);
  });

  req.on('error', (e) => {
    throw new Error(`Mercure error: ${e.message}`);
  });

  req.write(postData)
  req.end()
}
