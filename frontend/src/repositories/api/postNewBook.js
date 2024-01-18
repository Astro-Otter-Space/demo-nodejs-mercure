import axios from '@/services/axiosApi';
import { endpoint } from "@/repositories/api/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";

/**
 *
 * @param dataBody
 * @returns {Promise<boolean>}
 */
export const postNewBook = async (dataBody) => {
  try {
    const config = WS.buildApiHeaders(null, null)
    const response = await axios.post(endpoint.books, dataBody, config);
    if (201 !== response.status) {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    return true;
  } catch (err) {
    const error = new Error(err.statusText);
    error.code = err.status;
    throw error;
  }

}
