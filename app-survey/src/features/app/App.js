import Page from "../../components/Page";
import { useSurvey } from "./use-survey";
import { Logout } from "./Logout";
import { Question } from "./Question";

export const App = () => {
  const { isReady, currentQuestion, ...surveyApi } = useSurvey();

  return (
    <Page withPadding title={"Survey App"} actions={<Logout />}>
      {isReady ? (
        <Question {...surveyApi} {...currentQuestion} />
      ) : (
        "loading survey..."
      )}
    </Page>
  );
};
