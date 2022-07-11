import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { useSurveyPageView } from "./use-survey-page-view";

export const SurveyPageView = (props) => {
  const { questions, renderQuestion, logAnswer, scrollToActiveQuestion } =
    useSurveyPageView(props);

  return (
    <>
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        {questions.map((question) => (
          <Box key={question.id} sx={{ mt: 10, mb: 10 }}>
            <Box id={`question-${question.id}`} sx={{ pt: 10, pb: 10 }}>
              {renderQuestion(question, {
                onConfirm: (score, data = {}, notes = "") => {
                  // Move to next question:
                  scrollToActiveQuestion();

                  // Submit the answer's value:
                  logAnswer({
                    questionId: question.id,
                    score,
                    notes,
                    data
                  });
                }
                // onChange: (e) => console.log("change value", e)
              })}
            </Box>
          </Box>
        ))}
      </Stack>
    </>
  );
};
