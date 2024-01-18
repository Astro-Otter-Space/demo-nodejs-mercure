import {apiConfig} from "@/configuration/api";

export const buildApiHeaders = (customHeaders, queryParams, othersConfig) => {
  /**
   * customHeaders: add others headers
   * queryParams: add param like ?foo=bar
   */

  return {
    'headers': {
      ...apiConfig.headers,
      ...customHeaders
    },
    'params': queryParams,
    ...othersConfig
  }
}
