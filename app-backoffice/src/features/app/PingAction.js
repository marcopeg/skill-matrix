import { useEffect, useState } from "react";
import { useQuery, gql } from "../../services/hasura-client";

const PING_ACTION_QUERY = gql`
  query {
    ping: ping_action {
      timestamp
    }
  }
`;

export const PingAction = () => {
  const [enabled, setEnabled] = useState(false);
  const { isSuccess, data } = useQuery("PingAction", PING_ACTION_QUERY, {
    enabled
  });

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, 10);
  }, []);

  return isSuccess ? `*${data.ping.timestamp}*` : "loading";
};
