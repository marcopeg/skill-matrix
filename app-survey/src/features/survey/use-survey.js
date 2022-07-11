import { useState, useContext, createElement } from "react";

import { SurveyContext } from "./SurveyContext";
import { SurveyQuestion } from "./SurveyQuestion";

const hasScore = ($) => $.score !== null;
const hasNotScore = ($) => $.score === null;

export const useSurvey = () => {
  const { query, mutation, viewMode } = useContext(SurveyContext);
  const { isLoading, isSuccess, data } = query;

  const isReady = isSuccess && data;
  const isBeginning = isSuccess && data.questions.every(hasNotScore);
  const isCompleted = isSuccess && data.questions.every(hasScore);
  const isOngoing = isSuccess && !isBeginning && !isCompleted;

  // Flag to define whether to show the form intro or not
  const [akIntro, setAkIntro] = useState(false);
  const showIntro = isBeginning && !akIntro;

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
    isBeginning,
    isOngoing,
    isCompleted,
    showIntro,
    questions,
    progress,

    // API Interaction
    renderQuestion,
    logAnswer: mutation.mutate,
    akIntro: () => setAkIntro(true),

    // Support for changing the view mode
    availableViewModes: viewMode.items,
    viewMode: viewMode.current,
    setViewMode: viewMode.set
  };
};
