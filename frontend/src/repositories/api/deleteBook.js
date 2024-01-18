import axios from "@/services/axiosApi";
import * as WS from "@/repositories/api/abstractWebservice";
import {endpoint} from "@/repositories/api/endpoint";

/**
 *
 * @param uuid
 * @returns {Promise<boolean>}
 */
export const deleteBook = async (uuid) => {
  if ('' === uuid || null === uuid) {
    const error = new Error('No UUID provided, please fill it one');
    error.code = 500;
    throw error;
  }

  try {
    const endpointId = `${endpoint.books}/${uuid}`;
    const config = WS.buildApiHeaders(null, null, null)
    const response = await axios.delete(endpointId, config);
    if (200 !== response.status)  {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    const mercureUrl = response.headers['link'].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
    return {
      mercureUrl: mercureUrl
    };
  } catch (err) {
    const error = new Error(err.message);
    error.code = 500;
    throw error;
  }

}
