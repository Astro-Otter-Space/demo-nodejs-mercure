import axios from "@/services/axiosApi";
import * as WS from "@/repositories/api/abstractWebservice";

export const getBooks = async () => {
  try {
    let config = WS.buildApiHeaders(null, null, null)
    const endpoint = endpoint.books;
    const response = await axios.get(endpoint, config);

    if (200 !== response.status) {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    return response.data;
  } catch (err) {
    const error = new Error(err.message);
    error.code = 500;
    throw error;
  }
}
