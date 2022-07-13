import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const api = useQuestion(question, { onChange, onConfirm });
  const { title } = question.schema;

  const vSpace = isBigScreen ? 15 : 5;
  const hSpace = 2;

  return (
    <Box
      sx={{
        pt: vSpace,
        pb: vSpace,
        pl: hSpace,
        pr: hSpace
      }}
    >
      <Typography variant="h2" sx={{ mb: 2, fontSize: 20 }}>
        {title}
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item lg={8} md={6} xs={12}>
          {renderQuestion(question, api)}
        </Grid>
        <Grid item lg={4} md={6} xs={12} sx={{ mt: { xs: 4, md: 0 } }}>
          {(api.canConfirm || api.isConfirmed) && (
            <Stack sx={{ flex: 1 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};
