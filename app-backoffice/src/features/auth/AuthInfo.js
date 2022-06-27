import { gql, useQuery } from "../../services/hasura-client";
import { useAuth } from "./use-auth";

const AUTH_INFO_QUERY = gql`
  query {
    ping_action {
      timestamp
    }
  }
`;

export const AuthInfo = ({ children }) => {
  const { setToken } = useAuth();
  const { isFetching, isFetched, isError, error } = useQuery(
    "authInfo",
    AUTH_INFO_QUERY
  );

  if (isFetching) {
    return "...";
  }

  if (isFetched && isError) {
    return (
      <div style={{ margin: 10 }}>
        <h3>Auth Error</h3>
        <p>{error.response.errors[0].message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
        <button onClick={() => setToken(null)}>let me try again</button>
      </div>
    );
  }

  return children;
};
