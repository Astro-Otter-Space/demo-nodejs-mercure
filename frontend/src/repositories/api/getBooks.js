import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";

/**
 *
 * @returns {Promise<any>}
 */
export const getBooks = async () => {
  try {
    let config = WS.buildApiHeaders(null, null, null);
    const response = await axios.get(endpoint.books, config);
    if (200 !== response.status) {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    const mercureUrl = response.headers['link'].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
    return {
      dataBooks: response.data,
      mercureUrl: mercureUrl
    };
  } catch (err) {
    const error = new Error(err.message);
    error.code = 500;
    throw error;
  }
}
