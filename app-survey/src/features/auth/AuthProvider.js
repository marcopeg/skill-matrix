import { createContext, useState } from "react";
import { HasuraClientProvider } from "../../services/hasura-client";
import { AuthLogin } from "./AuthLogin";
import { AuthInfo } from "./AuthInfo";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const login = (token) => {
    localStorage.setItem("at", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("at");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout
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
