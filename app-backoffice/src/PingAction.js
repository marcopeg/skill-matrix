import { useQuery } from "./services/hasura-client";

export const PingAction = () => {
  const { isSuccess, data } = useQuery(
    "ping",
    `
    query {
      ping: ping_action {
        timestamp
      }
    }
  `
  );

  return isSuccess ? data.ping.timestamp : "loading";
};
