import { onInitFeature } from "./init-feature";

import { SurveyProvider } from "./SurveyContext";
import { SurveySelect } from "./SurveySelect";
import { SurveyView } from "./SurveyView";
import { SurveyProgress } from "./SurveyProgress";

export const survey = ({ registerTargets }) => {
  registerTargets({
    SURVEY_RENDER_MODE: "survey/render/mode",
    SURVEY_QUESTION_TYPE: "survey/question/type",
    SURVEY_INTRO: "survey/intro",
    SURVEY_COMPLETED: "survey/completed"
  });

  return [
    {
      target: "$INIT_FEATURE",
      handler: onInitFeature
    },
    {
      target: "$REACT_ROOT_COMPONENT",
      handler: (root) => ({
        component: ({ root }) => {
          return (
            <SurveyProvider>
              <root.component {...(root.props || {})} />
            </SurveyProvider>
          );
        },
        props: { root }
      })
    },
    {
      target: "$APP_TOOLBAR",
      handler: { component: SurveySelect }
    },
    {
      target: "$APP_TOOLBAR",
      handler: { component: SurveyProgress }
    },
    {
      target: "$APP_VIEW",
      handler: { component: SurveyView }
    }
  ];
};
