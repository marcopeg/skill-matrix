import { createContext, useState } from "react";
import { useGetContext } from "@forrestjs/react-root";
import {
  useQuery,
  useMutation,
  useQueryClient,
  gql
} from "../../services/hasura-client";

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
  // Data fetching
  const query = useQuery("LoadSurvey", LOAD_SURVEY);
  const queryClient = useQueryClient();
  const mutation = useMutation(LOG_ANSWER, {
    onSuccess: (data) => {
      const update = data.questions[0];
      queryClient.setQueryData("LoadSurvey", ({ questions }) => ({
        questions: questions.map((record) =>
          record.id === update.id ? update : record
        )
      }));
    },
    onError: () =>
      alert(
        "Could not save the last answer!\nPlease reload the page and try again."
      )
  });

  // View Mode Controls
  const availableViewModes = useGetContext("survey.render.modes.items");
  const [currentViewMode, setViewMode] = useState(
    availableViewModes.length ? availableViewModes[0] : null
  );

  return (
    <SurveyContext.Provider
      value={{
        query,
        mutation,
        availableViewModes,
        viewMode: {
          current: currentViewMode,
          items: availableViewModes,
          set: setViewMode
        }
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};
