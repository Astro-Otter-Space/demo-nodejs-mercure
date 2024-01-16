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
    topic: (uuid !== null) ? 'https://localhost/books/' + uuid : 'https://localhost/books',
    data: JSON.stringify({
      type: type,
      message: message,
    })
  });

  console.log(MercureConfig);
  const req = http.request(MercureConfig as http.RequestOptions, (res => console.log(`Headers: ${JSON.stringify(res.headers)}`)))

  req.on('error', (e) => {
    throw new Error(`Mercure error: ${e.message}`);
  });

  req.write(postData)
  req.end()
}
