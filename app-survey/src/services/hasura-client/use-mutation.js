import { useMutation as useGraphQLMutation } from "react-query";
import { useRequest } from "./use-request";

export const useMutation = (document, { variables = {}, ...options } = {}) => {
  const { request } = useRequest(document, variables);
  return useGraphQLMutation(request, options);
};
