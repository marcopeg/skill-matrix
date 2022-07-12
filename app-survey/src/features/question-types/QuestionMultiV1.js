import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const QuestionMultiV1 = ({ question, score, setScore, isConfirmed }) => {
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
      {score !== null && !isConfirmed && (
        <FormHelperText>
          Click again on the star to confirm your choice!
        </FormHelperText>
      )}
    </FormControl>
  );
};
