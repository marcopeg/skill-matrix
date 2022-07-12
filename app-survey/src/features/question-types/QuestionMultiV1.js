import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const QuestionMultiV1 = ({ question, score, setScore, isConfirmed }) => {
  const {
    values = [],
    direction = "column",
    display = "{label}"
  } = question.schema;

  return (
    <FormControl>
      <Stack direction={direction} spacing={2}>
        {values.map((item) => (
          <Button
            key={item.value}
            variant="outlined"
            onClick={() => setScore(item.value)}
            {...(isConfirmed ? { color: "success" } : { color: "primary" })}
            {...(score === item.value
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
    </FormControl>
  );
};
