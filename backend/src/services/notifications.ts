import * as querystring from "querystring";
import * as http from "http";
import {MercureConfig} from "../configuration/Mercure";

/**
 * Send notification to Mercure
 * @param uuid
 * @param type
 * @param message
 */
export const notifications = (uuid: string | null, type: string, message: string): void => {
  const postData = querystring.stringify({
    topic: 'https://localhost/books', //(uuid !== null) ? 'https://localhost/books/' + uuid : 'https://localhost/books',
    data: JSON.stringify({
      type: type,
      message: message,
    })
  });

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
