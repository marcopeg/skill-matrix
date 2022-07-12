import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";

import { useQuestion } from "../survey/use-question";

export const QuestionItem = ({
  question,
  renderQuestion,
  onChange,
  onConfirm
}) => {
  const api = useQuestion(question, { onChange, onConfirm });

  return (
    <Box sx={{ pt: 15, pb: 15, pl: 2, pr: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {renderQuestion(question, api)}

        {api.canConfirm && (
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={api.confirm}
          >
            Confirm
          </Button>
        )}
      </Stack>
    </Box>
  );
};
