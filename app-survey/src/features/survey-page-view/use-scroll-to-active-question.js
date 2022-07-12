// https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element#:~:text=React%2016.8%20%2B%2C%20Functional%20component

import { useEffect, useCallback } from "react";

export const useScrollToActiveQuestion = (activeQuestion) => {
  const scrollToActiveQuestion = useCallback(() => {
    if (!activeQuestion) return;

    const el = document.getElementById(`question-${activeQuestion.id}`);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }, [activeQuestion]);

  // Scroll to the next question that needs an answer:
  useEffect(() => {
    scrollToActiveQuestion();
  }, [activeQuestion, scrollToActiveQuestion]);

  return {
    scrollToActiveQuestion
  };
};
