import { createContext, useState, createElement } from "react";
import { useGetContext } from "@forrestjs/react-root";
import { useQuery, gql } from "../../services/hasura-client";
import { SurveyQuestion } from "./SurveyQuestion";

const LOAD_SURVEY = gql`
  query loadSurveyData {
    questions: get_survey_by_user {
      id: question_id
      schema: question_data
      score: answer_score
      notes: answer_notes
      data: answer_data
    }
  }
`;

export const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const { isLoading, isSuccess, data } = useQuery("LoadSurvey", LOAD_SURVEY);

  const availableViewModes = useGetContext("survey.render.modes.items");
  const [viewMode, setViewMode] = useState(
    availableViewModes.length ? availableViewModes[0] : null
  );

  const logAnswer = () => {
    console.log("@logAnswer");
  };

  const renderQuestion = (question, ...props) =>
    createElement(SurveyQuestion, {
      ...props,
      key: question.id,
      question
    });

  return (
    <SurveyContext.Provider
      value={{
        // API Interaction
        isLoading,
        isReady: isSuccess && data,
        questions: isSuccess ? data.questions : null,
        logAnswer,
        renderQuestion,

        // Support for changing the view mode
        availableViewModes,
        viewMode,
        setViewMode
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
