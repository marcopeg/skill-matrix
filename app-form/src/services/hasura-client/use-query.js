import { useQuery as useGraphQLQuery } from "react-query";
import { useRequest } from "./use-request";

export const useQuery = (
  key,
  document,
  { variables = {}, ...options } = {}
) => {
  const { request } = useRequest(document, variables);
  return useGraphQLQuery(key, request, options);
};
