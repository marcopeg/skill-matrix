import { useState, useEffect } from "react";
import { useQuery, gql } from "../../services/hasura-client";

const LOAD_SURVEY_DATA = gql`
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

export const useSurvey = () => {
  const { isLoading, isSuccess, data, ...survey } = useQuery(
    "LoadSurvey",
    LOAD_SURVEY_DATA
  );

  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Identify the initial current questions
  useEffect(() => {
    if (!data || currentQuestion !== null) return;
    setCurrentQuestion(data.questions.find(($) => $.score === null));
  }, [currentQuestion, data]);

  // console.log("@survey", survey);

  const currentIndex = currentQuestion
    ? data.questions.indexOf(currentQuestion)
    : null;

  const hasPrev = currentIndex ? currentIndex > 0 : null;

  const hasNext = currentIndex
    ? currentIndex < data.questions.length - 1
    : null;

  const movePrev = () => {
    if (!hasPrev) return;
    setCurrentQuestion(data.questions[currentIndex - 1]);
  };

  const answer = (score, data = {}, notes = "") => {
    console.log("@answer", score, data, notes);
    // Implement mutation
  };

  return {
    isLoading,
    isSuccess,
    isReady: currentQuestion !== null,
    questions: isSuccess ? data.questions : null,
    currentQuestion,
    currentIndex,
    hasPrev,
    hasNext,
    movePrev,
    answer
  };
};
