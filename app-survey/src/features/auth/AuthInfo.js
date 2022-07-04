import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

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
  const { logout } = useAuth();
  const { isFetching, isFetched, isError, error } = useQuery(
    "authInfo",
    AUTH_INFO_QUERY
  );

  if (isFetching) {
    return "...";
  }

  if (isFetched && isError) {
    return (
      <Alert severity="error" onClose={logout} sx={{ mb: "60vh" }}>
        <AlertTitle>Auth Error</AlertTitle>
        {error.response.errors[0].message}
      </Alert>
    );
  }

  return children;
};
