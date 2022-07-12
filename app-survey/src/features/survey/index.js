import { onInitFeature } from "./init-feature";

import { SurveyProvider } from "./SurveyContext";
import { SurveyView } from "./SurveyView";

export { useQuestion } from "./use-question";

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
      target: "$APP_VIEW",
      handler: { component: SurveyView }
    }
  ];
};
