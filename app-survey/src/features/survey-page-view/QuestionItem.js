import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";

import { useQuestion } from "../survey/use-question";

export const QuestionItem = ({
  question,
  renderQuestion,
  onChange,
  onConfirm
}) => {
  const api = useQuestion(question, { onChange, onConfirm });
  const { title } = question.schema;

  return (
    <Box sx={{ pt: 15, pb: 15, pl: 2, pr: 2 }}>
      <Typography variant="h2" sx={{ mb: 2, fontSize: 20 }}>
        {title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        {renderQuestion(question, api)}

        {(api.canConfirm || api.isConfirmed) && (
          <Stack sx={{ minWidth: 300 }}>
            <TextField
              multiline
              label="Notes:"
              value={api.notes}
              onChange={(e) => api.setNotes(e.target.value)}
              size="small"
              maxRows={4}
              sx={{ mb: 1 }}
              {...(api.isConfirmed ? { color: "success" } : {})}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={api.confirm}
              {...(api.isConfirmed ? { color: "success" } : {})}
            >
              Confirm
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
