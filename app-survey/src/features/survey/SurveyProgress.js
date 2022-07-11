import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useSurvey } from "./use-survey";

export const SurveyProgress = () => {
  const { progress } = useSurvey();

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex"
      }}
    >
      <CircularProgress variant="determinate" value={progress} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: 11 }}
        >{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
};
