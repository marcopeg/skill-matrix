import { useContext } from "react";

import { SurveyContext } from "./SurveyContext";

export const useSurvey = () => useContext(SurveyContext);
