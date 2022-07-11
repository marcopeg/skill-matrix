import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { useSurveyPageView } from "./use-survey-page-view";

export const SurveyPageView = (props) => {
  const { questions, renderQuestion, logAnswer, scrollToActiveQuestion } =
    useSurveyPageView(props);

  console.log(questions);

  return (
    <>
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        {questions.map((question) => (
          <Box
            key={question.id}
            sx={{
              transition: "all 0.3s ease-in-out",
              borderLeft: "10px solid white",
              ...(question.isActive
                ? {
                    borderColor: "primary.main"
                  }
                : question.score !== null
                ? {
                    borderColor: "success.main"
                  }
                : {
                    borderColor: "inherith"
                  })
            }}
          >
            <Box
              id={`question-${question.id}`}
              sx={{
                pt: 15,
                pb: 15,
                pl: 2,
                pr: 2,
                transform: question.isActive ? "scale(1)" : "scale(0.8)",
                transition: "transform 0.3s ease-in-out",
                scrollMargin: "10vh"
              }}
            >
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
