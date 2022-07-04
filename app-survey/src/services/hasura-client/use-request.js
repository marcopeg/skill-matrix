import { useContext } from "react";

import { request } from "graphql-request";

import { HasuraClientContext } from "./HasuraClientProvider";

export const useRequest = (document, variables = {}) => {
  const { endpoint: url, token } = useContext(HasuraClientContext);

  return {
    request: () =>
      request({
        url,
        document,
        variables,
        requestHeaders: token
          ? {
              Authorization: `Bearer ${token}`
            }
          : {}
      })
  };
};
