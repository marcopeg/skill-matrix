import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useGetContext } from "@forrestjs/react-root";
import { createComponents } from "../utils/create-components";
import Page from "../../components/Page";
import { Logout } from "./Logout";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const App = () => {
  const toolbarItems = useGetContext("app.toolbar.items");
  const viewItems = useGetContext("app.view.items");

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>AppTitle</Typography>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="flex-end"
            sx={{ flexGrow: 1 }}
          >
            <Logout />
          </Stack>
        </Toolbar>
      </AppBar>
      <Offset />
      <Box
        sx={{
          flex: 1,
          width: "100%",
          overflow: "hidden",
          pt: 4,
          pb: 4,
          pl: 3,
          pr: 3
        }}
      >
        <Page
          title={"Survey App"}
          headerActions={createComponents(toolbarItems)}
        >
          {createComponents(viewItems)}
        </Page>
      </Box>
    </>
  );
};
