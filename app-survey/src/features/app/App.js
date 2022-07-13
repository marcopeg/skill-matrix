import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useGetContext } from "@forrestjs/react-root";
import { createComponents } from "../utils/create-components";
import { Logout } from "./Logout";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const App = () => {
  const toolbarItems = useGetContext("app.toolbar.items");
  const viewItems = useGetContext("app.view.items");
  const appTitle = useGetContext("app.title");

  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const vSpace = isBigScreen ? 4 : 0;
  const hSpace = isBigScreen ? 3 : 0;

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>{appTitle}</Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            {createComponents(toolbarItems)}
            <Logout />
          </Stack>
        </Toolbar>
      </AppBar>
      <Offset />
      <Stack
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
          flex: 1,
          width: "100%",
          overflow: "scroll",
          pt: vSpace,
          pb: vSpace,
          pl: hSpace,
          pr: hSpace
        }}
      >
        {createComponents(viewItems)}
      </Stack>
    </>
  );
};
