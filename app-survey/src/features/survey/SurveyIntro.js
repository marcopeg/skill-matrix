import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const SurveyIntro = ({ ak, questions }) => {
  return (
    <Box onClick={ak}>
      <Typography variant="h4">Welcome to the Survey</Typography>
      <Typography variant="body1">
        There are {questions.length} questions to fill up.
      </Typography>
      <Typography variant="body1">
        The process is going to take approximately {questions.length * 30}{" "}
        seconds.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button fullWidth variant="contained" onClick={ak}>
          Start!
        </Button>
      </Box>
      <Typography variant="body1">
        <i>
          You can stop the process at any point in time and come back to it when
          you have time to continue.
        </i>
      </Typography>
    </Box>
  );
};
