import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useSurvey } from "./use-survey";

export const SurveyView = () => {
  const { viewMode, ...api } = useSurvey();

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

  // Render current view mode and pass on the Survey APIs
  return <viewMode.component {...api} />;
};
