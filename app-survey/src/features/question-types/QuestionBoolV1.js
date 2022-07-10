import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

const noop = () => {};

export const QuestionBoolV1 = ({
  question,
  onConfirm = noop,
  onChange = noop
}) => {
  const { title } = question.schema;
  const [value, setValue] = useState(question.score);
  const [isConfirmed, setIsConfirmed] = useState(question.score !== null);

  const apply = (evt) => {
    if (evt.target.value === undefined) return;
    const nextValue = parseInt(evt.target.value, 10);

    setIsConfirmed(value === nextValue);
    if (value === nextValue) {
      onConfirm(value);
    } else {
      setValue(nextValue);
      onChange(nextValue);
    }
  };

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup row value={value} onClick={apply}>
        <FormControlLabel
          value="100"
          control={
            <Radio
              {...(isConfirmed ? { color: "success" } : { color: "primary" })}
            />
          }
          label="True"
        />
        <FormControlLabel
          value="0"
          control={
            <Radio
              {...(isConfirmed ? { color: "success" } : { color: "primary" })}
            />
          }
          label="False"
        />
      </RadioGroup>
      {value !== null && !isConfirmed && (
        <FormHelperText>
          Click again on the star to confirm your choice!
        </FormHelperText>
      )}
    </FormControl>
  );
};
