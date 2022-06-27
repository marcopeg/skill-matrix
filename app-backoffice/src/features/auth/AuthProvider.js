import { createContext, useState } from "react";
import { HasuraClientProvider } from "../../services/hasura-client";
import { AuthLogin } from "./AuthLogin";
import { AuthInfo } from "./AuthInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken
      }}
    >
      {token ? (
        <HasuraClientProvider token={token}>
          <AuthInfo children={children} />
        </HasuraClientProvider>
      ) : (
        <AuthLogin setToken={setToken} />
      )}
    </AuthContext.Provider>
  );
};
