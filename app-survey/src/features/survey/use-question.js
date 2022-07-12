import { useState, useRef, useEffect } from "react";
import { useSurvey } from "./use-survey";

const noop = () => {};

export const useQuestion = (
  question,
  { onConfirm = noop, onChange = noop, delayConfirm = 100 } = {}
) => {
  const delayRef = useRef();
  const { logAnswer } = useSurvey();

  const [state, setState] = useState({
    questionId: question.id,
    score: question.score,
    notes: question.notes,
    data: question.data
  });

  const [isConfirmed, setIsConfirmed] = useState(question.score !== null);
  const [canConfirm, setCanConfirm] = useState(false);

  const setScore = (nextScore) => {
    setIsConfirmed(state.score === nextScore);

    if (state.score === nextScore) {
      confirm();
    } else {
      setState((oldState) => ({
        ...oldState,
        score: nextScore
      }));

      setCanConfirm(true);
      onChange({ ...state, score: nextScore });
    }
  };

  const setNotes = (nextNotes) =>
    setState((oldState) => ({ ...oldState, notes: nextNotes }));

  const confirm = () => {
    // Persist the answer and delay a bit the visual effects
    logAnswer(state, {
      onSuccess: () => {
        delayRef.current = setTimeout(() => {
          // Update flags
          setIsConfirmed(true);
          setCanConfirm(false);

          // Propagate event
          onConfirm(state);
        }, delayConfirm);
      }
    });
  };

  // Avoid memory leak on unmounting the questionnaire once it is completed.
  useEffect(() => () => clearTimeout(delayRef.current), []);

  return {
    ...state,
    setScore,
    setNotes,
    isConfirmed,
    canConfirm,
    confirm
  };
};
