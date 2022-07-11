import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { useQuestion } from "./use-question";

export const QuestionMultiV1 = ({ question, ...options }) => {
  const { value, setValue, isConfirmed } = useQuestion(question, options);
  const {
    title,
    values = [],
    direction = "column",
    display = "{label}"
  } = question.schema;

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <Stack direction={direction} spacing={2}>
        {values.map((item) => (
          <Button
            key={item.value}
            variant="outlined"
            onClick={() => setValue(item.value)}
            {...(isConfirmed ? { color: "success" } : { color: "primary" })}
            {...(value === item.value
              ? {
                  variant: "contained",
                  color: isConfirmed ? "success" : "primary"
                }
              : {})}
          >
            {display
              .replace("{label}", item.label)
              .replace("{value}", item.value)}
          </Button>
        ))}
      </Stack>
      {value !== null && !isConfirmed && (
        <FormHelperText>
          Click again on the star to confirm your choice!
        </FormHelperText>
      )}
    </FormControl>
  );
};
