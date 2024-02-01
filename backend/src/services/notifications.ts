import * as querystring from "querystring";
import https from "node:https";
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const req: RedirectableRequest<ClientQueryOptions, t> = https.request(MercureConfig, (res) => {
    const chunks: unknown[] = [];
    res.on('data', (chunk) => chunks.push(chunk));
    res.on('error', (err: Error) => console.error(err));
  });

  // req.on('error', (e) => {
  //   throw new Error(`Mercure error: ${e.message}`);
  // });

  req.write(postData);
  req.end();
}
