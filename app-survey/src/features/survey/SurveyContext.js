import { createContext, useState, createElement } from "react";
import { useGetContext } from "@forrestjs/react-root";
import { useQuery, useMutation, gql } from "../../services/hasura-client";
import { SurveyQuestion } from "./SurveyQuestion";

const LOAD_SURVEY = gql`
  query loadSurvey {
    questions: get_survey_by_user {
      id: question_id
      schema: question_data
      score: answer_score
      notes: answer_notes
      data: answer_data
    }
  }
`;

const LOG_ANSWER = gql`
  mutation logAnswer(
    $questionId: Int!
    $score: Int!
    $notes: String
    $data: json
  ) {
    questions: log_survey_by_user(
      args: {
        question_id: $questionId
        score: $score
        notes: $notes
        data: $data
      }
    ) {
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

  const { mutate: logAnswer } = useMutation(LOG_ANSWER, {
    onError: () =>
      alert(
        "Could not save the last answer!\nPlease reload the page and try again."
      )
  });

  const availableViewModes = useGetContext("survey.render.modes.items");
  const [viewMode, setViewMode] = useState(
    availableViewModes.length ? availableViewModes[0] : null
  );

  const renderQuestion = (question, props) =>
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
