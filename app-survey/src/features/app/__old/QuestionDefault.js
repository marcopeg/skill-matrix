import { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const QuestionDefault = ({ answer, title, initialValue }) => {
  const [value, setValue] = useState(initialValue || "");

  const isValid =
    (value === "" || parseInt(value, 10).toString() === value) &&
    value <= 100 &&
    value >= 0;

  const canSubmit = isValid && value !== null && value !== "";

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <TextField
        fullWidth
        label="Your answer:"
        variant="outlined"
        type="text"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={!isValid}
        helperText={"Choose a value between 0 and 100"}
      />
      {canSubmit && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => answer(value)}
        >
          Answer: {value}!
        </Button>
      )}
    </div>
  );
};
