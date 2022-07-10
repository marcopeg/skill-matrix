import { useState } from "react";

const noop = () => {};

export const useQuestion = (
  question,
  { onConfirm = noop, onChange = noop }
) => {
  const [value, _setValue] = useState(question.score);
  const [data, _setData] = useState(question.data);
  const [isConfirmed, setIsConfirmed] = useState(question.score !== null);

  const setValue = (nextValue, data = {}) => {
    setIsConfirmed(value === nextValue);
    if (value === nextValue) {
      onConfirm(value, data);
    } else {
      _setValue(nextValue);
      _setData(data);
      onChange(nextValue, data);
    }
  };

  return {
    value,
    data,
    setValue,
    isConfirmed
  };
};
