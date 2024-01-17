import axios from "@/services/axiosApi";
import {endpoint} from "@/repositories/api/endpoint";
import * as WS from "@/repositories/api/abstractWebservice";

export const getBooks = async () => {
  try {
    let config = WS.buildApiHeaders(null, null, null);
    const response = await axios.get(endpoint.books, config);
    if (200 !== response.status) {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    return response.data;
  } catch (err) {
    console.log(err.message)
    const error = new Error(err.message);
    error.code = 500;
    throw error;
  }
}
