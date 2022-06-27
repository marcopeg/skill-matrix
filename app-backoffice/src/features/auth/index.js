import { AuthProvider } from "./AuthProvider";

export { useAuth } from "./use-auth";

export const auth = () => {
  return [
    {
      target: "$REACT_ROOT_WRAPPER",
      handler: { component: AuthProvider }
    }
  ];
};
