import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";

/**
 *
 * @param uuid
 * @param data
 * @returns {Promise<boolean>}
 */
export const putBook = async (uuid, data) => {
  const endpointId = `${endpoint.books}/${uuid}`;
  const config = WS.buildApiHeaders(null, null, null);

  try {
    const response= await axios.put(endpointId, data, config);
    if (200 !== response.status) {
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
