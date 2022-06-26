import { HasuraClientProvider } from "./HasuraClientProvider";
export { gql } from "graphql-request";
export { useQuery } from "./use-query";

const hasuraClient = () => {
  return [
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: HasuraClientProvider }
    }
  ];
};

export default hasuraClient;
