import { SurveyIntro } from "./SurveyIntro";
import { SurveyCompleted } from "./SurveyCompleted";

export const onInitFeature = ({ createExtension, getConfig, setContext }) => {
  const renderModes = createExtension
    .sync("$SURVEY_RENDER_MODE")
    .map(($) => $[0]);

  const questionTypes = createExtension
    .sync("$SURVEY_QUESTION_TYPE")
    .map(($) => $[0]);

  const { value: surveyIntro } = createExtension.waterfall(
    "$SURVEY_INTRO",
    getConfig("survey.intro", { component: SurveyIntro })
  );

  const { value: surveyCompleted } = createExtension.waterfall(
    "$SURVEY_COMPLETED",
    getConfig("survey.completed", { component: SurveyCompleted })
  );

  setContext("survey.render.modes.items", renderModes);
  setContext("survey.question.types.items", questionTypes);
  setContext("survey.intro", surveyIntro);
  setContext("survey.completed", surveyCompleted);
};
