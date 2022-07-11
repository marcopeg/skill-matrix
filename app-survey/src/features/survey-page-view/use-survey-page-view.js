import { useScrollToActiveQuestion } from "./use-scroll-to-active-question";

export const useSurveyPageView = (props) => {
  const { questions } = props;

  const activeQuestion = questions.find(($) => $.score === null);
  const { scrollToActiveQuestion } = useScrollToActiveQuestion(activeQuestion);

  return {
    ...props,
    activeQuestion,

    // Decorate the list of questions with custom properties
    questions: questions.map((question) => ({
      ...question,
      isActive: activeQuestion && activeQuestion.id === question.id
    })),

    // Additional API
    scrollToActiveQuestion
  };
};
