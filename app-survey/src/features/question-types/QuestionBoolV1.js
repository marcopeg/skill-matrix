import { useState } from "react";

export const QuestionBoolV1 = ({ question, onConfirm }) => {
  const { title } = question.schema;
  const [value, setValue] = useState(null);

  const apply = (nextValue) => {
    if (value === nextValue) {
      onConfirm(value);
    } else {
      setValue(nextValue);
    }
  };

  return (
    <div>
      <h6>{title}</h6>
      <div onClick={() => apply(true)}>true {value === true ? "*" : null}</div>
      <div onClick={() => apply(false)}>
        false {value === false ? "*" : null}
      </div>
    </div>
  );
};
