import { useContext } from "react";

import { request } from "graphql-request";

import { HasuraClientContext } from "./HasuraClientProvider";

export const useRequest = (document, configVariables = {}) => {
  const { endpoint: url, token } = useContext(HasuraClientContext);

  return {
    request: (callVariables) =>
      request({
        url,
        document,
        variables: callVariables || configVariables,
        requestHeaders: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      })
  };
};
