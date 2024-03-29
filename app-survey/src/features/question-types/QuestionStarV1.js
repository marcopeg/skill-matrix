import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";

export const QuestionStarV1 = ({ question, score, setScore, isConfirmed }) => {
  const { stars = 5, startAtZero = false } = question.schema;

  const starItems = Array(stars)
    .fill(0)
    .map((_, idx) =>
      Math.round(
        (100 / (stars - (startAtZero ? 1 : 0))) * (startAtZero ? idx : idx + 1)
      )
    );

  return (
    <FormControl>
      <Box>
        {starItems.map((item) => (
          <IconButton key={item} onClick={() => setScore(item)}>
            {score === null || score < item ? (
              <StarOutlineOutlinedIcon />
            ) : (
              <StarIcon
                {...(isConfirmed ? { color: "success" } : { color: "primary" })}
              />
            )}
          </IconButton>
        ))}
      </Box>
    </FormControl>
  );
};
