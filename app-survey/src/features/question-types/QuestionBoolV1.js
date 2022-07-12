import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export const QuestionBoolV1 = ({ score, setScore, isConfirmed }) => {
  const onClick = (evt) => {
    if (evt.target.value === undefined) return;
    setScore(parseInt(evt.target.value, 10));
  };

  return (
    <FormControl>
      <RadioGroup row value={score} onClick={onClick}>
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
    </FormControl>
  );
};
