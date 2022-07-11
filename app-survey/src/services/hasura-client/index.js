import { HasuraClientProvider } from "./HasuraClientProvider";
export { gql } from "graphql-request";
export { useQueryClient } from "react-query";
export { useQuery } from "./use-query";
export { useMutation } from "./use-mutation";
export { HasuraClientProvider } from "./HasuraClientProvider";

export const hasuraClient = () => {
  return [
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: HasuraClientProvider }
    }
  ];
};
