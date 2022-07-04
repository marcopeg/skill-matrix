import { useQuery, gql } from "../../services/hasura-client";
import Page from "../../components/Page";
import { Logout } from "./Logout";

const PING_ACTION_QUERY = gql`
  query {
    ping: ping_action {
      timestamp
    }
  }
`;

export const App = () => {
  const { isSuccess, data } = useQuery("PingAction", PING_ACTION_QUERY);

  return (
    <Page withPadding title={"Survey App"} actions={<Logout />}>
      {isSuccess
        ? `Computer says: ${new Date(data.ping.timestamp)}`
        : "loading time..."}
    </Page>
  );
};
