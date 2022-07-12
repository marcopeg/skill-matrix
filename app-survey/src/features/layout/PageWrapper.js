import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

export const PageWrapper = (props) => (
  <Box
    {...props}
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      height: "100vh",
      backgroundColor: grey[200],
      // border: "4px solid white",
      // borderColor: "primary.light",
      // borderColor: "red",
      overflow: "hidden"
      // pt: 2,
      // pb: 2
    }}
  />
);
