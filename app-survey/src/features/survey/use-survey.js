import { useContext, createElement } from "react";

import { SurveyContext } from "./SurveyContext";
import { SurveyQuestion } from "./SurveyQuestion";

export const useSurvey = () => {
  const { query, mutation, viewMode } = useContext(SurveyContext);
  const { isSuccess, data } = query;

  const isReady = isSuccess && data;
  const questions = isSuccess ? data.questions : null;

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
