import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const QuestionScaleV1 = ({ question, score, setScore, isConfirmed }) => {
  const { span = 5, startAtZero = false, direction = "row" } = question.schema;

  const values = Array(span)
    .fill(0)
    .map((_, idx) =>
      Math.round(
        (100 / (span - (startAtZero ? 1 : 0))) * (startAtZero ? idx : idx + 1)
      )
    );

  return (
    <FormControl>
      <Stack direction={direction} spacing={2}>
        {values.map((item) => (
          <Button
            key={item}
            variant="outlined"
            onClick={() => setScore(item)}
            {...(isConfirmed ? { color: "success" } : { color: "primary" })}
            {...(score === item
              ? {
                  variant: "contained",
                  color: isConfirmed ? "success" : "primary"
                }
              : {})}
          >
            {item}
          </Button>
        ))}
      </Stack>
    </FormControl>
  );
};
