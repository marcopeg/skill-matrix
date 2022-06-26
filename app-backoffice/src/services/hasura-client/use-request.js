import { useContext } from "react";

import { request } from "graphql-request";

import { HasuraClientContext } from "./HasuraClientProvider";

export const useRequest = (document, variables = {}) => {
  const { endpoint: url } = useContext(HasuraClientContext);

  return {
    request: () =>
      request({
        url,
        document,
        variables
      })
  };
};
