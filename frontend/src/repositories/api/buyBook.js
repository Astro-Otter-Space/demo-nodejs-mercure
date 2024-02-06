import axios from "@/services/axiosApi";
import { endpoint } from '@/repositories/api/endpoint'
import * as WS from '@/repositories/api/abstractWebservice'

export const buyBook = async (uuid) => {

  const endpointBuyBook = `${endpoint.books}/${uuid}/buy`;
  const config = WS.buildApiHeaders(null, null, null);
  try {
    const response = await axios.patch(endpointBuyBook, {}, config);
    if (200 !== response.status) {
      const error = new Error(response.statusText);
      error.code = response.status;
      throw error;
    }

    const mercureUrl = response.headers['link'].match(/<([^>]+)>;\s+rel=(?:mercure|"[^"]*mercure[^"]*")/)[1];
    return {
      mercureUrl: mercureUrl
    };

  } catch (err) {
    const error = new Error(err.statusText);
    error.code = err.status;
    throw error;
  }
}
