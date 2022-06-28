import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useGetConfig } from "@forrestjs/react-root";

export const HasuraClientContext = createContext();

export const HasuraClientProvider = ({
  children,
  endpoint: receivedEndpoint,
  token: receivedToken = null
}) => {
  const endpoint = useGetConfig("hasuraClient.endpoint", receivedEndpoint);
  const token = useGetConfig("hasuraClient.token", receivedToken);

  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity
        }
      }
    })
  );

  return (
    <HasuraClientContext.Provider
      value={{
        endpoint,
        token
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </HasuraClientContext.Provider>
  );
};
