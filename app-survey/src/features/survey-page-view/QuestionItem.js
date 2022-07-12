import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";

export const QuestionItem = ({
  question,
  renderQuestion,
  logAnswer,
  onConfirm: propagateOnConfirm
}) => {
  const [canConfirm, setCanConfirmed] = useState(false);
  const [localScore, setLocalScore] = useState(question.score);

  const onChange = (nextValue) => {
    setCanConfirmed(true);
    setLocalScore(nextValue);
  };

  const onConfirm = (score, data = {}, notes = "") => {
    setCanConfirmed(false);

    // Submit the answer's value:
    logAnswer({
      questionId: question.id,
      score,
      notes,
      data
    });

    // Propagate event out
    propagateOnConfirm(question, score, data, notes);
  };

  const handleConfirm = () => onConfirm(localScore);

  return (
    <Box sx={{ pt: 15, pb: 15, pl: 2, pr: 2 }}>
      {renderQuestion(question, {
        onConfirm,
        onChange
      })}
      <Stack
        sx={{
          display: "flex",
          height: canConfirm ? 100 : 0,
          overflow: "hidden",
          transition: "all .3s ease-in-out"
        }}
      >
        <Divider sx={{ pt: 4, mb: 1 }} />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={4}
        >
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
