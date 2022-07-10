import { useSurvey } from "./use-survey";

export const SurveySelect = () => {
  const { availableViewModes } = useSurvey();

  if (!availableViewModes.length < 2) return null;

  return "@availableViewModes";
};
