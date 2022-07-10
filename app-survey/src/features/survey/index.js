import { onInitFeature } from "./init-feature";

import { SurveySelect } from "./SurveySelect";
import { SurveyView } from "./SurveyView";

export const survey = ({ registerTargets }) => {
  registerTargets({
    SURVEY_RENDER_MODE: "survey/render/mode"
  });

  return [
    {
      target: "$INIT_FEATURE",
      handler: onInitFeature
    },
    {
      target: "$APP_TOOLBAR",
      handler: { component: SurveySelect }
    },
    {
      target: "$APP_VIEW",
      handler: { component: SurveyView }
    }
  ];
};
