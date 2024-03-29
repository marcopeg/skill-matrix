import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

import { useSurveyPageView } from "./use-survey-page-view";
import { QuestionItem } from "./QuestionItem";

export const SurveyPageView = (props) => {
  const { questions, renderQuestion } = useSurveyPageView(props);

  return (
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
              : question.hasAnswer
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
              display: "flex",
              flexDirection: "column",
              scrollMargin: "10vh"
            }}
          >
            <QuestionItem question={question} renderQuestion={renderQuestion} />
          </Box>
        </Box>
      ))}
    </Stack>
  );
};
