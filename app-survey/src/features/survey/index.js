import { onInitFeature } from "./init-feature";

import { SurveyProvider } from "./SurveyContext";
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
      target: "$APP_VIEW",
      handler: { component: SurveyView }
    }
  ];
};
