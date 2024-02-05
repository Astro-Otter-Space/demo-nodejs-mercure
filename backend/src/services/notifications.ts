import * as querystring from "querystring";
import https from "node:https";
// import http from "node:http";
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


  const postData: string = querystring.stringify({
    topic: `https://localhost/books/${uriTopic}`,
    data: JSON.stringify({
      type: type,
      message: message,
      book: book
    })
  });

  const req = https.request(MercureConfig, (res) => {
    const chunks: unknown[] = [];
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('error', (err: Error) => {
      throw new Error(`Mercure response error: ${err.message}`)
    });
  });
console.log(req);
  req.on('error', (e) => {
    throw new Error(`Mercure request error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}
