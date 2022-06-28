import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import { useAuth } from "../auth";

export const Logout = () => {
  const { logout } = useAuth();

  return (
    <IconButton onClick={logout}>
      <LogoutIcon />
    </IconButton>
  );
};
