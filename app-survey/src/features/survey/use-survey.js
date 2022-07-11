import { useContext, createElement } from "react";

import { SurveyContext } from "./SurveyContext";
import { SurveyQuestion } from "./SurveyQuestion";

export const useSurvey = () => {
  const { query, mutation, viewMode } = useContext(SurveyContext);
  const { isLoading, isSuccess, data } = query;

  const isReady = isSuccess && data;

  // Decorate the list of questions with custom properties
  const questions = isSuccess
    ? data.questions.map((question) => ({
        ...question,
        hasAnswer: question.score !== null
      }))
    : null;

  // Calculate survey progress
  const _answered = ($) => $.score !== null;
  const progress = isReady
    ? (questions.filter(_answered).length / questions.length) * 100
    : 0;

  const renderQuestion = (question, props) =>
    createElement(SurveyQuestion, {
      ...props,
      key: question.id,
      question
    });

  return {
    // Survey Data
    isLoading,
    isReady,
    questions,
    progress,

    // API Interaction
    renderQuestion,
    logAnswer: mutation.mutate,

    // Support for changing the view mode
    availableViewModes: viewMode.items,
    viewMode: viewMode.current,
    setViewMode: viewMode.set
  };
};
