import * as querystring from "querystring";
import * as http from "http";
import {MercureConfig} from "../configuration/Mercure";

/**
 * Send notification to Mercure
 * @param uuid
 */
export const notifications = (uuid: string | null): void => {

  const postData = querystring.stringify({
    topic: 'https://localhost/books/' + uuid,
    data: JSON.stringify({
      type: (null === uuid) ? 'create' : 'update',
      message: (null === uuid) ? 'New book' : `Book ${uuid} have been updated`,
    })
  });

  const req = http.request(MercureConfig as http.RequestOptions, (res => console.log(`Headers: ${JSON.stringify(res.headers)}`)))

  req.on('error', (e) => {
    throw new Error(`Mercure error: ${e.message}`);
  });

  req.write(postData)
  req.end()
}
