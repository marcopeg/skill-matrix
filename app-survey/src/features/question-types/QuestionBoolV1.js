import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

import { useQuestion } from "./use-question";

export const QuestionBoolV1 = ({ question, ...options }) => {
  const { value, setValue, isConfirmed } = useQuestion(question, options);
  const { title } = question.schema;

  const onClick = (evt) => {
    if (evt.target.value === undefined) return;
    setValue(parseInt(evt.target.value, 10));
  };

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <RadioGroup row value={value} onClick={onClick}>
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
