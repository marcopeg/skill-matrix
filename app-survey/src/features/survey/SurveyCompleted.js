import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const SurveyCompleted = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4">Survey Completed</Typography>
    <Typography variant="body1">
      Congratulations, you have completed all the questions.
    </Typography>
  </Box>
);
