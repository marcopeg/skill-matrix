import Stack from "@mui/material/Stack";
import { useGetContext } from "@forrestjs/react-root";
import { createComponents } from "../utils/create-components";
import Page from "../../components/Page";
import { Logout } from "./Logout";

export const App = () => {
  const toolbarItems = useGetContext("app.toolbar.items");
  const viewItems = useGetContext("app.view.items");

  return (
    <Page
      title={"Survey App"}
      headerActions={
        <Stack direction="row" spacing={2}>
          {createComponents(toolbarItems)}
          <Logout />
        </Stack>
      }
    >
      {createComponents(viewItems)}
    </Page>
  );
};
