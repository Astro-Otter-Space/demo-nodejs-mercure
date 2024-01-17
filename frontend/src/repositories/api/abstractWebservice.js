import {apiConfig} from "@/configuration/api";

export const buildApiHeaders = (customHeaders, queryParams, othersConfig) => {
  return {
    'headers': {
      ...apiConfig.headers,
      ...customHeaders
    },
    'params': queryParams,
    ...othersConfig

  }
}
