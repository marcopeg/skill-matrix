import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";

const noop = () => {};

export const QuestionStarV1 = ({
  question,
  onConfirm = noop,
  onChange = noop
}) => {
  const { title, stars = 5, startAtZero = false } = question.schema;
  const [value, setValue] = useState(question.score);
  const [isConfirmed, setIsConfirmed] = useState(question.score !== null);

  const starItems = Array(stars)
    .fill(0)
    .map((_, idx) =>
      Math.round(
        (100 / (stars - (startAtZero ? 1 : 0))) * (startAtZero ? idx : idx + 1)
      )
    );

  const apply = (nextValue) => {
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
      <Stack direction="row">
        {starItems.map((item) => (
          <IconButton key={item} onClick={() => apply(item)}>
            {value === null || value < item ? (
              <StarOutlineOutlinedIcon />
            ) : (
              <StarIcon
                {...(isConfirmed ? { color: "success" } : { color: "primary" })}
              />
            )}
          </IconButton>
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
