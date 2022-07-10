import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { useSurvey } from "./use-survey";

export const SurveyView = () => {
  const { availableViewModes } = useSurvey();

  if (!availableViewModes.length)
    return (
      <Alert severity="warning">
        <AlertTitle>
          Survey has no available <i>View Modes</i>
        </AlertTitle>
        Please add at least one <i>View Mode</i> as so to render the Survey
        questions.
      </Alert>
    );

  console.log("@availableViewModes", availableViewModes);
  return "@currentViewMode";
};
