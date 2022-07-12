import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useSurvey } from "./use-survey";

export const SurveyProgress = () => {
  const { progress } = useSurvey();

  // Hide selector if the survey is completed.
  if (progress === 100) return null;

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
        <Typography variant="caption">
          {Math.round(progress)}
          <small>%</small>
        </Typography>
      </Box>
    </Box>
  );
};
