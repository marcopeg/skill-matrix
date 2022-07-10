import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

import { useSurvey } from "./use-survey";
import { SurveyProgress } from "./SurveyProgress";

export const SurveyView = () => {
  const { viewMode, isLoading, isReady, ...api } = useSurvey();

  // No view mode is set - alert
  if (!viewMode)
    return (
      <Alert severity="warning">
        <AlertTitle>
          Survey has no available <i>View Modes</i>
        </AlertTitle>
        Please add at least one <i>View Mode</i> as so to render the Survey
        questions.
      </Alert>
    );

  // Take care of the loading time here
  if (isLoading)
    return (
      <Stack direction="row" justifyContent="center" sx={{ mt: 10, mb: 10 }}>
        <CircularProgress />
      </Stack>
    );

  // It finished loading but something goes wrong
  if (!isReady)
    return (
      <Alert severity="warning">
        <AlertTitle>Oooops!</AlertTitle>
        Something went wrong while fetching your data!
      </Alert>
    );

  // Render current view mode and pass on the Survey APIs
  return (
    <>
      <SurveyProgress />
      <viewMode.component {...api} />
    </>
  );
};
