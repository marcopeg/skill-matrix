// https://stackoverflow.com/questions/43441856/how-to-scroll-to-an-element#:~:text=React%2016.8%20%2B%2C%20Functional%20component

import { useEffect } from "react";

export const useScrollToActiveQuestion = (activeQuestion) => {
  const scrollToActiveQuestion = () => {
    if (!activeQuestion) return;

    const el = document.getElementById(`question-${activeQuestion.id}`);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  };

  // Scroll to the next question that needs an answer:
  useEffect(() => {
    scrollToActiveQuestion();
  });

  return {
    scrollToActiveQuestion
  };
};
